import React, { Component } from "react";

export default class Topic0 extends Component {
    render() {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-200 p-6 space-y-6">
                <div className="flex items-center gap-4">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sky-400">
                        <rect x="3" y="3" width="18" height="18" rx="4" />
                        <path d="M7 8h10M7 12h10M7 16h6" />
                    </svg>
                    <h1 className="text-3xl font-bold text-sky-400">Chapter 1.8 – Accounting Transactions (2016–17)</h1>
                </div>

                <section className="space-y-2">
                    <h2 className="text-xl font-semibold text-emerald-400">1. Create Company</h2>
                    <p>Create a company with your name followed by your student code and Chapter name for the Financial Year 2016–17.</p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-semibold text-emerald-400">2. Create the following Ledgers</h2>
                    <ul className="list-disc list-inside text-sky-300">
                        <li>Capital – ₹3,22,000.00</li>
                        <li>Corporation Bank – ₹2,80,000.00</li>
                        <li>Loan from Mittal Traders – ₹15,000.00</li>
                        <li>Outstanding Salary – ₹8,000.00</li>
                        <li>Profit &amp; Loss – ₹65,000.00 (Loss)</li>
                    </ul>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-semibold text-emerald-400">3. Order Placed – 01.05.2016</h2>
                    <p>Company placed an order to <strong>Digital Express</strong> for:</p>
                    <ul className="list-disc list-inside">
                        <li>8 pcs Micromax Canvas 6 (one mobile free with each set)</li>
                        <li>40 pcs 64GB SanDisk Pen Drive (Buy 1 Get 1 Free)</li>
                        <li>20 pcs Earphone</li>
                        <li>Samsung Galaxy J3</li>
                    </ul>
                    <p className="text-slate-400">Ref No: PO/009/16-17</p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-semibold text-emerald-400">4. Goods Received – 02.05.2016</h2>
                    <p>Digital Express delivered all the products and stored them in Bhawanipore godown.</p>
                    <p className="text-slate-400">Ref No: DE/CH/020/2016-17</p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-semibold text-emerald-400">5. Bill Raised – 02.05.2016</h2>
                    <table className="w-full border border-slate-700 text-sm">
                        <thead className="bg-slate-800">
                            <tr>
                                <th className="p-2 border">Item</th>
                                <th className="p-2 border">Rate (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="p-2 border">Micromax Canvas 6</td><td className="p-2 border">13,999.00</td></tr>
                            <tr><td className="p-2 border">64GB SanDisk Pen Drive</td><td className="p-2 border">620.00</td></tr>
                            <tr><td className="p-2 border">Earphone</td><td className="p-2 border">150.00</td></tr>
                            <tr><td className="p-2 border">Samsung Galaxy J3</td><td className="p-2 border">8,990.00</td></tr>
                            <tr><td className="p-2 border">Loading Charges</td><td className="p-2 border">1,500.00</td></tr>
                        </tbody>
                    </table>
                    <p className="text-slate-400">Ref No: DE/Inv/1617/025</p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-semibold text-emerald-400">6. Sale to Tech Media – 31.05.2016</h2>
                    <p>Sold 8 pcs Earphone @ ₹180 and 2 pcs Samsung Galaxy J3 @ ₹9,800 with 15% Trade Discount.</p>
                    <p className="text-slate-400">Ref No: ACL/0050/2016-17</p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-semibold text-emerald-400">7. Payment to Digital Express – 31.05.2016</h2>
                    <p>Paid entire due amount by Corporation Bank Cheque No: 440330.</p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-semibold text-emerald-400">8. Purchase from Ramco Systems Ltd – 01.06.2016</h2>
                    <table className="w-full border border-slate-700 text-sm">
                        <thead className="bg-slate-800">
                            <tr>
                                <th className="p-2 border">Item</th>
                                <th className="p-2 border">Batch No</th>
                                <th className="p-2 border">Mfg</th>
                                <th className="p-2 border">Exp</th>
                                <th className="p-2 border">Qty</th>
                                <th className="p-2 border">Purchase</th>
                                <th className="p-2 border">Selling</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="p-2 border">Junior Horlicks 1Kg</td><td className="p-2 border">JB/475/120</td><td className="p-2 border">Feb-16</td><td className="p-2 border">Jan-17</td><td className="p-2 border">10</td><td className="p-2 border">410</td><td className="p-2 border">460</td></tr>
                            <tr><td className="p-2 border">Nutrilite 200g</td><td className="p-2 border">NT/10/124</td><td className="p-2 border">Jan-16</td><td className="p-2 border">Oct-17</td><td className="p-2 border">15</td><td className="p-2 border">195</td><td className="p-2 border">215</td></tr>
                            <tr><td className="p-2 border">Oats 500g</td><td className="p-2 border">KL/142/001</td><td className="p-2 border">Jan-16</td><td className="p-2 border">Nov-17</td><td className="p-2 border">9</td><td className="p-2 border">120</td><td className="p-2 border">135</td></tr>
                        </tbody>
                    </table>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-semibold text-emerald-400">9–12. Remaining Transactions</h2>
                    <ul className="list-decimal list-inside">
                        <li>01.06.2016: Received full amount from Tech Media via HDFC Bank, Garia Branch Cheque No: 750125.</li>
                        <li>02.06.2016: Credit limit ₹2,500 and 15 credit days allowed to Rosell India Ltd. Sold 2 pcs Junior Horlicks & 4 pcs Oats. Ref: ACL/0052/16-17.</li>
                        <li>01.07.2016: Paid Ramco Systems Ltd by Corporation Bank Cheque No: 440331.</li>
                        <li>Same day: Received full amount from Rosell India Ltd by UBI Cheque No: 001245.</li>
                    </ul>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-semibold text-emerald-400">10. Credit Sale to Rosell India Ltd – 02.06.2016</h2>
                    <p>Company set credit limit of ₹2,500 and credit period of 15 days to Rosell India Ltd.</p>
                    <p>Sold 2 pcs Junior Horlicks and 4 pcs Oats 500g.</p>
                    <p className="text-slate-400">Ref No: ACL/0052/16-17</p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-semibold text-emerald-400">11. Payment to Ramco Systems Ltd – 01.07.2016</h2>
                    <p>Company paid the full bill amount by cheque of Corporation Bank.</p>
                    <p className="text-slate-400">Cheque No: 440331</p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-semibold text-emerald-400">12. Amount Received from Rosell India Ltd – 01.07.2016</h2>
                    <p>Company received the full amount from Rosell India Ltd through cheque of UBI.</p>
                    <p className="text-slate-400">Cheque No: 001245</p>
            
                <ul className="list-decimal list-inside">
                    <li>01.06.2016: Received full amount from Tech Media via HDFC Bank, Garia Branch Cheque No: 750125.</li>
                    <li>02.06.2016: Credit limit ₹2,500 and 15 credit days allowed to Rosell India Ltd. Sold 2 pcs Junior Horlicks & 4 pcs Oats. Ref: ACL/0052/16-17.</li>
                    <li>01.07.2016: Paid Ramco Systems Ltd by Corporation Bank Cheque No: 440331.</li>
                    <li>Same day: Received full amount from Rosell India Ltd by UBI Cheque No: 001245.</li>
                </ul>
            </section>
            </div >
        );
    }
}
