/* This code demonstrates object-oriented programming in JavaScript.
   SOLID design principles, with a specific pattern */

/* =========
   Data Model
   ========= */

/* Represents a single bathroom report. This class only stores report data. */
class BathroomReport {
    constructor(id, location, description, urgency, isAnonymous) {
      this.id = id;
      this.location = location;
      this.description = description;
      this.urgency = urgency;
      this.isAnonymous = isAnonymous;
    }
  }
  
  /* ==================
     Repository Structure
     ================== */
  
  /* Base repository class. Other repositories will follow this structure. */
  class ReportRepository {
    save(report) {
      throw new Error("save() not implemented");
    }
    findAll() {
      throw new Error("findAll() not implemented");
    }
  }
  
  /* Repository that simulates saving reports to a database. */
  class DatabaseReportRepository extends ReportRepository {
    save(report) {
      console.log("Saving report to database:", report);
    }
    findAll() {
      return [];
    }
  }
  
  /* Repository that stores reports in memory. Useful for testing or examples. */
  class InMemoryReportRepository extends ReportRepository {
    constructor() {
      super();
      this.reports = [];
    }
    save(report) {
      this.reports.push(report);
    }
    findAll() {
      return this.reports;
    }
  }
  
  /* ============
     Service Layer
     ============ */
  
  /* Handles logic related to bathroom reports. Uses a repository without knowing how data is stored. */
  class BathroomReportService {
    constructor(reportRepository) {
      this.reportRepository = reportRepository;
    }
    submitReport(report) {
      if (!report.location || !report.description) {
        throw new Error("Report data is incomplete");
      }
      this.reportRepository.save(report);
    }
    getAllReports() {
      return this.reportRepository.findAll();
    }
  }
  
  /* =========
     Example Use
     ========= */
  
  // Choose which repository to use
  const repository = new InMemoryReportRepository();
  
  // Create the service
  const reportService = new BathroomReportService(repository);
  
  // Create a report
  const report = new BathroomReport(
    1,
    "Engineering Building - 2nd Floor",
    "No soap in dispenser",
    "High",
    true
  );
  
  // Submit the report
  reportService.submitReport(report);
  
  // View all reports
  console.log(reportService.getAllReports());
  