import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const baseFileUrl = process.env.REACT_APP_IMAGE_URL;

const OurFinancial = () => {
    const [financialReports, setFinancialReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const financialReportsUrl = `${baseUrl}/financial-reports`;
    const financialReportTypesUrl = `${baseUrl}/financial-report-types`;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [reportsResponse, reportTypesResponse] = await Promise.all([
            axios.get(financialReportsUrl),
            axios.get(financialReportTypesUrl),
          ]);
  
          const reportType = reportTypesResponse.data.find(
            (type) => type.name === "बित्तिय विवरण"
          );
          const annualReports = reportsResponse.data.filter(
              (report) => report.financial_report_type === reportType.id
              );
          console.log(reportType);
          console.log(annualReports);
          setFinancialReports(annualReports);
          setLoading(false);
        } catch (error) {
          setError("There was an error fetching the financial reports!");
          setLoading(false);
        }
      };
  
      fetchData();
    }, [financialReportsUrl, financialReportTypesUrl]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div className="container my-4">
        <h2 className="text-center mb-4">बित्तिय विवरण</h2>
        <div className="row justify-content-center">
          {financialReports.map((report, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card h-100 text-center shadow">
                <div className="card-body">
                  <h5 className="card-title">{report.title}</h5>
                  <p className="card-text">{report.description}</p>
                  <div className="d-flex justify-content-around">
                    <a
                      href={`${baseFileUrl}${report.file}`}
                      className="btn btn-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                    <a
                      href={`${baseFileUrl}${report.file}`}
                      className="btn btn-primary"
                      download
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default OurFinancial;