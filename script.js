// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Generate initial values
    document.getElementById('autoCode').textContent = 
        Math.random().toString(36).substr(2, 6).toUpperCase();
    document.getElementById('issueDate').textContent = 
        new Date().toLocaleDateString('en-GB');
});

// Advisory Board Functions
function addAdvisoryRow() {
    const newRow = document.createElement('div');
    newRow.className = 'advisory-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Name" class="adv-name">
        <input type="text" placeholder="Designation" class="adv-designation">
        <input type="text" placeholder="Department" class="adv-department">
    `;
    document.getElementById('advisoryBoard').appendChild(newRow);
}

// Data Collection
function getFormData() {
    const advisoryMembers = Array.from(document.querySelectorAll('.advisory-row'))
        .map(row => ({
            name: row.querySelector('.adv-name').value,
            designation: row.querySelector('.adv-designation').value,
            department: row.querySelector('.adv-department').value
        }));

    return {
        fileNumber: document.getElementById('fileNumber').textContent,
        issueDate: document.getElementById('issueDate').textContent,
        // receiptDate: document.getElementById('receiptDate').value,
        societyName: document.getElementById('societyName').value,
        aimsObjectives: document.getElementById('aimsObjectives').value,
        treasurerTitle: document.getElementById('treasurerTitle').value,
        treasurerName: document.getElementById('treasurerName').value,
        bankAccount: document.getElementById('bankAccount').value,
        bankName: document.getElementById('bankName').value,
        advisoryMembers: advisoryMembers.filter(m => m.name) // Remove empty rows
    };
}

// Excel Export (Fixed)
// function saveDraft() {
//     const data = getFormData();
//     const excelData = {
//         ...data,
//         // Flatten advisory members
//         ...data.advisoryMembers.reduce((acc, member, index) => ({
//             ...acc,
//             [`Member${index+1}_Name`]: member.name,
//             [`Member${index+1}_Designation`]: member.designation,
//             [`Member${index+1}_Department`]: member.department
//         }), {})
//     };
//     delete excelData.advisoryMembers;

//     const ws = XLSX.utils.json_to_sheet([excelData]);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Application");
//     XLSX.writeFile(wb, "society_application.xlsx");
// }



function saveDraft() {
    const data = getFormData();
    
    // Retrieve existing pending societies from localStorage
    let pendingSocieties = JSON.parse(localStorage.getItem("pendingSocieties")) || [];

    // Add new society to pending list
    pendingSocieties.push(data);

    // Save updated list to localStorage
    localStorage.setItem("pendingSocieties", JSON.stringify(pendingSocieties));

    alert("Your society application has been sent for approval.");
}
// function saveDraft() {
//     const data = getFormData();
    
//     // Retrieve existing societies from localStorage
//     let societies = JSON.parse(localStorage.getItem("societies")) || [];

//     // Add new society
//     societies.push(data);

//     // Save back to localStorage
//     localStorage.setItem("societies", JSON.stringify(societies));

//     // Export to Excel (optional)
//     const excelData = {
//         ...data,
//         ...data.advisoryMembers.reduce((acc, member, index) => ({
//             ...acc,
//             [`Member${index+1}_Name`]: member.name,
//             [`Member${index+1}_Designation`]: member.designation,
//             [`Member${index+1}_Department`]: member.department
//         }), {})
//     };
//     delete excelData.advisoryMembers;

//     const ws = XLSX.utils.json_to_sheet([excelData]);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Application");
//     XLSX.writeFile(wb, "society_application.xlsx");
// }


function redirectToAdmin() {
    window.location.href = "home.html"; // Redirect to Admin Panel
}


function generatePDF() {
    const doc = new jspdf.jsPDF();
    const data = getFormData();
    const margin = 20;
    let yPos = margin;

    // Set default font
    doc.setFont('helvetica');
    
    // *** HEADER SECTION ***
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("FOR OFFICE USE ONLY", margin, yPos);
    yPos += 10;

    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.text(`File Number : ${data.fileNumber}`, margin, yPos);
    doc.text(`Issue Date : ${data.issueDate}`, margin + 80, yPos);
    doc.text(`Receipt Date : ${data.receiptDate}`, margin + 160, yPos);
    yPos += 15;

    // *** TITLE ***
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text("STUDENT SOCIETY REGISTRATION/RENEWAL APPLICATION", margin, yPos, { maxWidth: 180 });
    yPos += 15;

    // *** FORM DETAILS (Properly Styled) ***
    doc.setFontSize(12);

    const fields = [
        { label: "Society Name", value: data.societyName },
        { label: "Senior Treasurer", value: `${data.treasurerTitle} ${data.treasurerName}` },
        { label: "Bank Details", value: `${data.bankAccount} @ ${data.bankName}` }
    ];

    fields.forEach(field => {
        doc.setFont(undefined, 'bold');
        doc.text(`${field.label} :`, margin, yPos);
        doc.setFont(undefined, 'normal');
        doc.text(field.value, margin + 50, yPos);
        yPos += 10;
    });

    // *** Aims & Objectives (Multiline Formatting) ***
    doc.setFont(undefined, 'bold');
    doc.text("Aims & Objectives :", margin, yPos);
    yPos += 7;
    doc.setFont(undefined, 'normal');
    const splitText = doc.splitTextToSize(data.aimsObjectives, 160);
    doc.text(splitText, margin + 10, yPos);
    yPos += splitText.length * 7 + 10;

    // *** ADVISORY MEMBERS ***
    doc.setFont(undefined, 'bold');
    doc.text("Advisory Members :", margin, yPos);
    yPos += 10;
    doc.setFont(undefined, 'normal');

    data.advisoryMembers.forEach(member => {
        doc.text(`Name :`, margin, yPos);
        doc.text(member.name, margin + 35, yPos);
        yPos += 7;
        
        doc.text(`Designation :`, margin, yPos);
        doc.text(member.designation, margin + 35, yPos);
        yPos += 7;

        doc.text(`Department :`, margin, yPos);
        doc.text(member.department, margin + 35, yPos);
        yPos += 12; // Add space before next member
    });

    yPos += 10;

    // *** RECOMMENDATION SECTION ***
    doc.setFont(undefined, 'bold');
    doc.text("Recommendation of the Senior Treasurer :", margin, yPos);
    yPos += 12;

    doc.setFont(undefined, 'normal');
    let recommendationText = "This is to certify that I am personally aware and satisfied with the progress and achievements made in section 8 and the proposed programmes earmarked in section 10.";
    let recommendationLines = doc.splitTextToSize(recommendationText, 160);
    doc.text(recommendationLines, margin, yPos);
    yPos += recommendationLines.length * 7 + 10;

    doc.setFont(undefined, 'bold');
    doc.text("Date :", margin, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(".......................", margin + 20, yPos);
    yPos += 15;

    // *** SIGNATURE SECTION ***
    doc.setFont(undefined, 'bold');
    doc.text("Authorized Signatures :", margin, yPos);
    yPos += 10;

    ['Senior Treasurer', 'Advisory Board Chair', 'Dean'].forEach(title => {
        doc.text(`${title} :`, margin, yPos);
        doc.rect(margin + 50, yPos - 5, 80, 15); // Signature box
        yPos += 20;
    });

    // Save PDF
    doc.save('Society_Register_Application.pdf');
}



function submitSociety() {
    const societyData = getFormData();

    let pendingSocieties = JSON.parse(localStorage.getItem("pendingSocieties")) || [];
    pendingSocieties.push(societyData);

    localStorage.setItem("pendingSocieties", JSON.stringify(pendingSocieties));

    alert("Your society application has been sent for approval.");
}
