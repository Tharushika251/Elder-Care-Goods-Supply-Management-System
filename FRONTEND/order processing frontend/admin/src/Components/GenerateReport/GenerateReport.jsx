import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print"
import './GenerateReport.css'
const GenerateReport = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [currentDate, setCurrentDate] = useState("");
    const [currentTime, setCurrentTime] = useState("");

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
            .then((res) => res.json())
            .then((data) => { setAllProducts(data) });
    }

    useEffect(() => {
        fetchInfo();
        setCurrentDate(new Date().toLocaleDateString());
        setCurrentTime(new Date().toLocaleTimeString());
    }, []);

    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: "Product report",
        onAfterPrint: (success) => { // Check for success argument
          if (success) {
            alert("Product report successfully downloaded");
          }
        },
      });

    return (
        <div className="report-container">
            <button onClick={handlePrint} className='btn-generate-report'>Download</button>

            
            <div ref={ComponentsRef}>
                <div className="report-header">
                    <h2>Forever Caring Corner</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Date:</td>
                                <td>{currentDate}</td>
                            </tr>
                            <tr>
                                <td>Time:</td>
                                <td>{currentTime}</td>
                            </tr>
                            <tr>
                                <td>Title:</td>
                                <td>Report of products in product catalog</td>
                            </tr>
                            <tr>
                                <td>Manager:</td>
                                <td>Wicramasinghe D A T N</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="hr">
                <hr />
                </div>
                
                <div className="report-item">
                    
                    {allProducts.length > 0 ? allProducts.map((product, index) => (
                        <div key={index} className="report-details">
                            <p className="report-detail">Title - {product.name}</p>
                            
                            <p className="report-detail-label">Old Price - ${product.old_price} , New Price - ${product.new_price} , Category - {product.category}</p>
                            
                            <hr />
                            
                        </div>
                    )) : <h1>No Result Found</h1>}
                    
                </div>
                <div className="report-footer">
                    <p>Signature: ________________</p>
                </div>
            </div>
        </div>
    );
}

export default GenerateReport;
