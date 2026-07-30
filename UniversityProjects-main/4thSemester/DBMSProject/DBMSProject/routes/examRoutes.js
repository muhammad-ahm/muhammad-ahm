import express from 'express';
import { SQL } from '../utils/db.js';

const router = express.Router();

// Shared SGPA logic used across every stage:
// 1. sum marks obtained per student per course offering (rid)
// 2. sum max possible marks per rid (from dist)
// 3. look up each course's GPA points from the grade table by percentage
// 4. weight-average each course's GPA by its credit hours (theory + lab) to get SGPA
const SGPA_BASE = `
  WITH course_totals AS (
    SELECT rid, SUM(total) AS max_marks
    FROM dist
    GROUP BY rid
  ),
  student_marks AS (
    SELECT regno, rid, SUM(marks) AS obtained
    FROM marks
    GROUP BY regno, rid
  ),
  student_course_gpa AS (
    SELECT
      sm.regno,
      r.rid,
      r.year,
      r.semester,
      r.class AS batch,
      r.cid,
      c.title AS course_title,
      (c.theory + c.lab) AS credit_hours,
      g.gpa
    FROM student_marks sm
    JOIN course_totals ct ON ct.rid = sm.rid
    JOIN recap r          ON r.rid = sm.rid
    JOIN course c         ON c.cid = r.cid
    JOIN grade g
      ON (sm.obtained / NULLIF(ct.max_marks, 0)) * 100 BETWEEN g.start AND g."end"
     AND g.version = 1
  ),
  sgpa AS (
    SELECT
      s.regno,
      s.name,
      scg.year,
      scg.semester,
      ROUND((SUM(scg.gpa * scg.credit_hours) / SUM(scg.credit_hours))::numeric, 2) AS sgpa
    FROM student_course_gpa scg
    JOIN student s ON s.regno = scg.regno
    GROUP BY s.regno, s.name, scg.year, scg.semester
  )
`;

// Stage 1: Years that contain at least one probation case
router.get('/probation/years', async (req, res) => {
  try {
    const results = await SQL`
      ${SQL.unsafe(SGPA_BASE)}
      SELECT DISTINCT year FROM sgpa WHERE sgpa < 2.0 ORDER BY year;
    `;
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stage 2: Semesters (within a year) that contain a probation case
router.get('/probation/semesters', async (req, res) => {
  try {
    const { year } = req.query;
    const results = await SQL`
      ${SQL.unsafe(SGPA_BASE)}
      SELECT DISTINCT semester FROM sgpa WHERE year = ${year} AND sgpa < 2.0 ORDER BY semester;
    `;
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stage 3: Batches (classes) within year+semester that contain a probation case
router.get('/probation/batches', async (req, res) => {
  try {
    const { year, semester } = req.query;
    const results = await SQL`
      ${SQL.unsafe(SGPA_BASE)}
      , probation AS (
        SELECT regno, year, semester FROM sgpa WHERE sgpa < 2.0
      )
      SELECT DISTINCT scg.batch AS class
      FROM student_course_gpa scg
      JOIN probation p ON p.regno = scg.regno AND p.year = scg.year AND p.semester = scg.semester
      WHERE scg.year = ${year} AND scg.semester = ${semester}
      ORDER BY scg.batch;
    `;
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stage 4: Recaps (courses) within year+semester+batch that have a probation case enrolled
router.get('/probation/recaps', async (req, res) => {
  try {
    const { year, semester, class: cls } = req.query;
    const results = await SQL`
      ${SQL.unsafe(SGPA_BASE)}
      , probation AS (
        SELECT regno, year, semester FROM sgpa WHERE sgpa < 2.0
      )
      SELECT DISTINCT scg.rid, c.code, scg.course_title AS title
      FROM student_course_gpa scg
      JOIN course c ON c.cid = scg.cid
      JOIN probation p ON p.regno = scg.regno AND p.year = scg.year AND p.semester = scg.semester
      WHERE scg.year = ${year} AND scg.semester = ${semester} AND scg.batch = ${cls}
      ORDER BY c.code;
    `;
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stage 5: Students on probation enrolled in the selected recap
router.get('/probation/students/:rid', async (req, res) => {
  try {
    const { rid } = req.params;
    const results = await SQL`
      ${SQL.unsafe(SGPA_BASE)}
      SELECT sg.regno, sg.name, sg.sgpa
      FROM sgpa sg
      JOIN student_course_gpa scg
        ON scg.regno = sg.regno AND scg.year = sg.year AND scg.semester = sg.semester
      WHERE scg.rid = ${rid} AND sg.sgpa < 2.0
      ORDER BY sg.sgpa;
    `;
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
