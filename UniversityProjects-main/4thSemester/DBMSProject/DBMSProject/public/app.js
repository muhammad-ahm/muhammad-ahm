function App() {
  return {
    years: [],
    semesters: [],
    batches: [],
    recaps: [],
    students: [],

    selectedYear: null,
    selectedSemester: null,
    selectedClass: null,
    selectedRid: null,

    async init() {
      await this.loadYears();
    },

    async loadYears() {
      this.years = await fetch('/api/exams/probation/years').then(r => r.json());
    },

    async selectYear(year) {
      this.selectedYear = year;
      this.selectedSemester = null;
      this.selectedClass = null;
      this.selectedRid = null;
      this.batches = [];
      this.recaps = [];
      this.students = [];
      this.semesters = await fetch(`/api/exams/probation/semesters?year=${year}`).then(r => r.json());
    },

    async selectSemester(semester) {
      this.selectedSemester = semester;
      this.selectedClass = null;
      this.selectedRid = null;
      this.recaps = [];
      this.students = [];
      const url = `/api/exams/probation/batches?year=${this.selectedYear}&semester=${semester}`;
      this.batches = await fetch(url).then(r => r.json());
    },

    async selectBatch(cls) {
      this.selectedClass = cls;
      this.selectedRid = null;
      this.students = [];
      const url = `/api/exams/probation/recaps?year=${this.selectedYear}&semester=${this.selectedSemester}&class=${encodeURIComponent(cls)}`;
      this.recaps = await fetch(url).then(r => r.json());
    },

    async selectRecap(rid) {
      this.selectedRid = rid;
      this.students = await fetch(`/api/exams/probation/students/${rid}`).then(r => r.json());
    },

    reset() {
      this.selectedYear = null;
      this.selectedSemester = null;
      this.selectedClass = null;
      this.selectedRid = null;
      this.semesters = [];
      this.batches = [];
      this.recaps = [];
      this.students = [];
      this.loadYears();
    },
  };
}