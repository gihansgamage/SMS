// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Generate initial values
    document.getElementById('autoCode').textContent = 
        // Math.random().toString(36).substr(2, 6).toUpperCase();
        Math.floor(100 + Math.random() * 900);
        
    document.getElementById('issueDate').textContent = 
        new Date().toLocaleDateString('en-GB');
});

// Show modal on page load
document.addEventListener('DOMContentLoaded', () => {
    // Hide main container
    document.querySelector('.container').style.display = 'none';
    
    // Show modal
    document.getElementById('regulationsModal').style.display = 'flex';

    // Enable accept button when checkbox is checked
    document.getElementById('acceptCheckbox').addEventListener('change', function() {
        document.getElementById('acceptButton').disabled = !this.checked;
    });
});

function acceptRegulations() {
    // Hide modal
    document.getElementById('regulationsModal').style.display = 'none';
    // Show main form
    document.querySelector('.container').style.display = 'block';
}

function declineRegulations() {
    window.location.href = 'home.html';
}

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

// Committee Mameber Functions
function addCMRow() {
    const newRow = document.createElement('div');
    newRow.className = 'cm-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Student Reg No" class="cm-designation">
        <input type="text" placeholder="Name" class="cm-name">

    `;
    document.getElementById('committeeMembers').appendChild(newRow);
}

// // Registered Members
// function addRegisteredMemberRow() {
//     const newRow = document.createElement('div');
//     newRow.className = 'rm-row';
//     newRow.innerHTML = `
//         <input type="text" placeholder="Student Reg No" class="rm-month">
//         <input type="text" placeholder="Name" class="rm-name">  

//     `;
//     document.getElementById('registeredMembers').appendChild(newRow);
// }

let rowCount = 1; // Counter for row numbers

function addRegisteredMemberRow() {
    rowCount++; // Increase row count

    const newRow = document.createElement('div');
    newRow.className = 'rm-row';
    newRow.innerHTML = `
        <span class="rm-number">${rowCount}</span>  
        <input type="text" placeholder="Student Reg No" class="rm-month">
        <input type="text" placeholder="Name" class="rm-name">  
    `;

    document.getElementById('registeredMembers').appendChild(newRow);
}


// Add planned Activity
function addPlannedActivityRow() {
    const newRow = document.createElement('div');
    newRow.className = 'plannedActivity-row';
    newRow.innerHTML = `
        <input type="month" placeholder="Month" class="plannedActivity-month">
        <input type="text" placeholder="Planned Activity" class="plannedActivity-name">   

    `;
    document.getElementById('plannedActivity').appendChild(newRow);
}


// Data Collection
// function getFormData() {
//     const advisoryMembers = Array.from(document.querySelectorAll('.advisory-row'))
//         .map(row => ({
//             name: row.querySelector('.adv-name').value,
//             designation: row.querySelector('.adv-designation').value,
//             department: row.querySelector('.adv-department').value
//         }));

//     return {
//         fileNumber: document.getElementById('fileNumber').textContent,
//         issueDate: document.getElementById('issueDate').textContent,
//         // receiptDate: document.getElementById('receiptDate').value,
//         societyName: document.getElementById('societyName').value,
//         aimsObjectives: document.getElementById('aimsObjectives').value,
//         treasurerTitle: document.getElementById('treasurerTitle').value,
//         treasurerName: document.getElementById('treasurerName').value,
//         bankAccount: document.getElementById('bankAccount').value,
//         bankName: document.getElementById('bankName').value,
//         advisoryMembers: advisoryMembers.filter(m => m.name) // Remove empty rows
//     };
// }

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

    // alert("Your society application has been sent for approval.");
    showMessage();
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


// function generatePDF() {
//     const doc = new jspdf.jsPDF();
//     const data = getFormData();
//     const margin = 20;
//     let yPos = margin;

//     // Set default font
//     doc.setFont('helvetica');
    
//     // *** HEADER SECTION ***
//     doc.setFontSize(14);
//     doc.setFont(undefined, 'bold');
//     doc.text("FOR OFFICE USE ONLY", margin, yPos);
//     yPos += 10;

//     doc.setFontSize(11);
//     doc.setFont(undefined, 'normal');
//     doc.text(`File Number : ${data.fileNumber}`, margin, yPos);
//     doc.text(`Issue Date : ${data.issueDate}`, margin + 80, yPos);
//     doc.text(`Receipt Date : ${data.receiptDate}`, margin + 160, yPos);
//     yPos += 15;

//     // *** TITLE ***
//     doc.setFontSize(16);
//     doc.setFont(undefined, 'bold');
//     doc.text("STUDENT SOCIETY REGISTRATION/RENEWAL APPLICATION", margin, yPos, { maxWidth: 180 });
//     yPos += 15;

//     // *** FORM DETAILS (Properly Styled) ***
//     doc.setFontSize(12);

//     const fields = [
//         { label: "Society Name", value: data.societyName },
//         { label: "Senior Treasurer", value: `${data.treasurerTitle} ${data.treasurerName}` },
//         { label: "Bank Details", value: `${data.bankAccount} @ ${data.bankName}` }
//     ];

//     fields.forEach(field => {
//         doc.setFont(undefined, 'bold');
//         doc.text(`${field.label} :`, margin, yPos);
//         doc.setFont(undefined, 'normal');
//         doc.text(field.value, margin + 50, yPos);
//         yPos += 10;
//     });

//     // *** Aims & Objectives (Multiline Formatting) ***
//     doc.setFont(undefined, 'bold');
//     doc.text("Aims & Objectives :", margin, yPos);
//     yPos += 7;
//     doc.setFont(undefined, 'normal');
//     const splitText = doc.splitTextToSize(data.aimsObjectives, 160);
//     doc.text(splitText, margin + 10, yPos);
//     yPos += splitText.length * 7 + 10;

//     // *** ADVISORY MEMBERS ***
//     doc.setFont(undefined, 'bold');
//     doc.text("Advisory Members :", margin, yPos);
//     yPos += 10;
//     doc.setFont(undefined, 'normal');

//     data.advisoryMembers.forEach(member => {
//         doc.text(`Name :`, margin, yPos);
//         doc.text(member.name, margin + 35, yPos);
//         yPos += 7;
        
//         doc.text(`Designation :`, margin, yPos);
//         doc.text(member.designation, margin + 35, yPos);
//         yPos += 7;

//         doc.text(`Department :`, margin, yPos);
//         doc.text(member.department, margin + 35, yPos);
//         yPos += 12; // Add space before next member
//     });

//     yPos += 10;

//     // *** RECOMMENDATION SECTION ***
//     doc.setFont(undefined, 'bold');
//     doc.text("Recommendation of the Senior Treasurer :", margin, yPos);
//     yPos += 12;

//     doc.setFont(undefined, 'normal');
//     let recommendationText = "This is to certify that I am personally aware and satisfied with the progress and achievements made in section 8 and the proposed programmes earmarked in section 10.";
//     let recommendationLines = doc.splitTextToSize(recommendationText, 160);
//     doc.text(recommendationLines, margin, yPos);
//     yPos += recommendationLines.length * 7 + 10;

//     doc.setFont(undefined, 'bold');
//     doc.text("Date :", margin, yPos);
//     doc.setFont(undefined, 'normal');
//     doc.text(".......................", margin + 20, yPos);
//     yPos += 15;

//     // *** SIGNATURE SECTION ***
//     doc.setFont(undefined, 'bold');
//     doc.text("Authorized Signatures :", margin, yPos);
//     yPos += 10;

//     ['Senior Treasurer', 'Advisory Board Chair', 'Dean'].forEach(title => {
//         doc.text(`${title} :`, margin, yPos);
//         doc.rect(margin + 50, yPos - 5, 80, 15); // Signature box
//         yPos += 20;
//     });

//     // Save PDF
//     doc.save('Society_Register_Application.pdf');
// }

// Updated getFormData() - Collects ALL form fields
function getFormData() {
    // Advisory Members
    const advisoryMembers = Array.from(document.querySelectorAll('.advisory-row'))
        .map(row => ({
            name: row.querySelector('.adv-name').value,
            designation: row.querySelector('.adv-designation').value,
            department: row.querySelector('.adv-department').value
        }));

    // Committee Members
    const committeeMembers = Array.from(document.querySelectorAll('.cm-row'))
        .map(row => ({
            regNo: row.querySelector('.cm-designation').value,
            name: row.querySelector('.cm-name').value
        }));

    // Registered Members
    const registeredMembers = Array.from(document.querySelectorAll('.rm-row'))
        .map(row => ({
            regNo: row.querySelector('.rm-month').value,
            name: row.querySelector('.rm-name').value
        }));

    // Planned Activities
    const plannedActivities = Array.from(document.querySelectorAll('.plannedActivity-row'))
        .map(row => ({
            month: row.querySelector('.plannedActivity-month').value,
            activity: row.querySelector('.plannedActivity-name').value
        }));

    return {
        // Office Use
        fileNumber: document.getElementById('fileNumber').textContent,
        issueDate: document.getElementById('issueDate').textContent,
        
        // Section 1-5
        societyName: document.getElementById('societyName').value,
        aimsObjectives: document.getElementById('aimsObjectives').value,
        treasurerTitle: document.getElementById('treasurerTitle').value,
        treasurerName: document.getElementById('treasurerName').value,
        treasurerDesignation: document.getElementById('treasurerDeaignation').value,
        treasurerMail: document.getElementById('treasurerMail').value,
        treasurerAddress: document.getElementById('treasurerAddress').value,
        treasurerOfficeNo: document.getElementById('treasurerOfficeNo').value,
        treasurerResidenceNo: document.getElementById('treasurerResidenceNo').value,
        treasurerMobileNo: document.getElementById('treasurerMobileNo').value,
        bankAccount: document.getElementById('bankAccount').value,
        bankName: document.getElementById('bankName').value,
        advisoryMembers: advisoryMembers.filter(m => m.name),

        // Section 6 - Office Bearers
        president: {
            regNo: document.getElementById('presidentRegNo').value,
            name: document.getElementById('presidentName').value,
            address: document.getElementById('presidentAddress').value,
            residenceNo: document.getElementById('presidentResidenceNo').value,
            mobileNo: document.getElementById('presdentMobileNo').value
        },
        vicePresident: {
            regNo: document.getElementById('visePresidentRegNo').value,
            name: document.getElementById('visePresidentName').value,
            address: document.getElementById('visePresidentAddress').value,
            residenceNo: document.getElementById('visePresidentResidenceNo').value,
            mobileNo: document.getElementById('visePresdentMobileNo').value
        },
        juniorTreasurer: {
            regNo: document.getElementById('juniorTreasurerRegNo').value,
            name: document.getElementById('juniorTreasureName').value,
            address: document.getElementById('juniorTreasureAddress').value,
            residenceNo: document.getElementById('vjuniorTreasureResidenceNo').value,
            mobileNo: document.getElementById('juniorTreasureMobileNo').value
        },
        secretary: {
            regNo: document.getElementById('secretaryRegNo').value,
            name: document.getElementById('secretaryName').value,
            address: document.getElementById('secretaryAddress').value,
            residenceNo: document.getElementById('secretaryResidenceNo').value,
            mobileNo: document.getElementById('secretaryMobileNo').value
        },
        jointSecretary: {
            regNo: document.getElementById('jointSecretaryRegNo').value,
            name: document.getElementById('jointSecretaryName').value,
            address: document.getElementById('jointSecretaryAddress').value,
            residenceNo: document.getElementById('jointSecretaryResidenceNo').value,
            mobileNo: document.getElementById('jointSecretaryMobileNo').value
        },
        editor: {
            regNo: document.getElementById('editorRegNo').value,
            name: document.getElementById('editorName').value,
            address: document.getElementById('editorAddress').value,
            residenceNo: document.getElementById('editorResidenceNo').value,
            mobileNo: document.getElementById('editorMobileNo').value
        },

        // Section 6.2-6.3
        committeeMembers: committeeMembers.filter(m => m.name),
        agmDate: document.getElementById('agmDate').value,

        // Section 7-8
        registeredMembers: registeredMembers.filter(m => m.name),
        plannedActivities: plannedActivities.filter(a => a.activity)
    };
}

// Updated generatePDF() - Includes ALL sections
// function generatePDF() {
//     const doc = new jspdf.jsPDF('p', 'mm', 'a4');
//     const data = getFormData();
//     let yPos = 20;
//     const margin = 15;
//     const pageWidth = doc.internal.pageSize.width;

//     // Header Section
//     doc.setFont('helvetica', 'bold');
//     doc.setFontSize(14);
//     doc.text("FOR OFFICE USE ONLY", margin, yPos);
//     yPos += 10;

//     doc.setFontSize(11);
//     doc.text(`File Number: ${data.fileNumber}`, margin, yPos);
//     doc.text(`Issue Date: ${data.issueDate}`, margin + 70, yPos);
//     yPos += 15;

//     // Main Title
//     doc.setFontSize(16);
//     doc.text("STUDENT SOCIETY REGISTRATION/RENEWAL APPLICATION", margin, yPos, { maxWidth: 180 });
//     yPos += 15;

//     // Society Information
//     doc.setFontSize(12);
//     const mainFields = [
//         `Society Name: ${data.societyName}`,
//         `Senior Treasurer: ${data.treasurerTitle} ${data.treasurerName}`,
//         `Bank Details: ${data.bankAccount} - ${data.bankName}`,
//         `Contact: ${data.treasurerMobileNo} | ${data.treasurerMail}`
//     ];

//     mainFields.forEach(field => {
//         doc.text(field, margin, yPos);
//         yPos += 10;
//     });

//     // Aims & Objectives
//     doc.setFont('helvetica', 'bold');
//     doc.text("Aims & Objectives:", margin, yPos);
//     yPos += 7;
//     doc.setFont('helvetica', 'normal');
//     doc.text(doc.splitTextToSize(data.aimsObjectives, 180), margin, yPos);
//     yPos += doc.splitTextToSize(data.aimsObjectives, 180).length * 7 + 10;

//     // Office Bearers Section
//     const officers = [
//         { title: 'President', data: data.president },
//         { title: 'Vice President', data: data.vicePresident },
//         { title: 'Junior Treasurer', data: data.juniorTreasurer },
//         { title: 'Secretary', data: data.secretary },
//         { title: 'Joint Secretary', data: data.jointSecretary },
//         { title: 'Editor', data: data.editor }
//     ];

//     doc.setFont('helvetica', 'bold');
//     doc.text("Office Bearers:", margin, yPos);
//     yPos += 10;

//     officers.forEach(officer => {
//         doc.setFont('helvetica', 'bold');
//         doc.text(`${officer.title}:`, margin, yPos);
//         doc.setFont('helvetica', 'normal');
//         const details = [
//             `Reg No: ${officer.data.regNo}`,
//             `Name: ${officer.data.name}`,
//             `Address: ${officer.data.address}`,
//             `Contact: ${officer.data.residenceNo} | ${officer.data.mobileNo}`
//         ];
//         details.forEach(detail => {
//             doc.text(detail, margin + 10, yPos);
//             yPos += 7;
//         });
//         yPos += 5;
//     });

//     // Committee Members
//     doc.addPage();
//     yPos = 20;
//     doc.setFont('helvetica', 'bold');
//     doc.text("Committee Members:", margin, yPos);
//     yPos += 10;
//     data.committeeMembers.forEach((member, index) => {
//         doc.text(`${index + 1}. ${member.name} (${member.regNo})`, margin, yPos);
//         yPos += 10;
//     });

//     // Registered Members
//     doc.setFont('helvetica', 'bold');
//     doc.text("Registered Members:", margin, yPos);
//     yPos += 10;
//     data.registeredMembers.forEach((member, index) => {
//         doc.text(`${index + 1}. ${member.name} (${member.regNo})`, margin, yPos);
//         yPos += 10;
//     });

//     // Planned Activities
//     doc.addPage();
//     yPos = 20;
//     doc.setFont('helvetica', 'bold');
//     doc.text("Planned Activities:", margin, yPos);
//     yPos += 10;
//     data.plannedActivities.forEach(activity => {
//         doc.text(`${activity.month}: ${activity.activity}`, margin, yPos);
//         yPos += 10;
//     });

//     // Save PDF
//     doc.save('Society_Application_Complete.pdf');
// }



function generatePDF() {
    const doc = new jspdf.jsPDF('p', 'mm', 'a4');
    const data = getFormData();
    let yPos = 20;
    const margin = 30;
    const lineHeight = 7;
    const pageWidth = 210; // A4 width in mm


    const pageHeight = doc.internal.pageSize.height; // Get page height
    const topMargin = 20;
    const bottomMargin = 20;
    
    // Function to check if new page is needed
    function checkPageLimit() {
        if (yPos + bottomMargin > pageHeight) { // If content is close to the bottom, add a new page
            doc.addPage();
            yPos = topMargin; // Reset position on new page
        }
    }
    

    // Set default font
    doc.setFont("Times", "normal");
    doc.setFontSize(12);

    // ===== PAGE 1 =====
    // Office Use Section
    doc.setFont("Times", "bold");
    doc.setFontSize(14);
    doc.text("FOR OFFICE USE ONLY", margin, yPos);
    doc.setFontSize(11);
    doc.text(`FILE NUMBER: ${data.fileNumber}`, margin + 70 , yPos);
    
    yPos += 10;

    doc.setFontSize(11); 
    doc.text(`DATE OF ISSUE: ${data.issueDate}`, margin, yPos);
    doc.text("DATE OF RECEIPT OF APPLICATION: ", margin + 70, yPos);
    yPos += 15;

    // Main Title
    // doc.setFontSize(16);
    // doc.setFont("bold")
    // doc.text("APPLICATION FOR REGISTRATION OF STUDENT SOCIETY", margin, yPos, { maxWidth: 180 });
    // yPos += 10;
    // doc.text(`FOR THE ACADEMIC YEAR - ${data.issueDate.substring(6,10)}/${parseInt(data.issueDate.substring(6,10))+1}`, margin, yPos);
    // yPos += 15;
    // Get page center position

    const centerX = pageWidth / 2;

    // First line
    doc.setFontSize(14);
    doc.setFont("Times", "bold");
    doc.text("APPLICATION FOR REGISTRATION OF STUDENT SOCIETY", 
            centerX, 
            yPos, 
            { align: 'center', maxWidth: 180 ,  decoration: 'underline'});
    yPos += 5;

    // Second line
    doc.text(`FOR THE ACADEMIC YEAR - ${data.issueDate.substring(6,10)}/${parseInt(data.issueDate.substring(6,10))+1}`, 
            centerX, 
            yPos, 
            { align: 'center',  decoration: 'underline' });
    yPos += 15;

    // Section 1: Society Name
    doc.setFontSize(12);
    doc.text(`1. Name of the society:`, margin, yPos);
    doc.setFont("Times", "normal");
    doc.text(` ${data.societyName}`, margin + 50, yPos);
    yPos += 10;

    // Section 2: Aims and Objectives
    doc.setFont("Times", "bold");
    doc.text(`2. Aims and objective of the society:`, margin , yPos);
    yPos += lineHeight;
    doc.setFont("Times", "normal");
    const aims = doc.splitTextToSize(data.aimsObjectives, 170);
    aims.forEach(line => {
        doc.text(line, margin + 4, yPos);
        yPos += lineHeight;
    });
    yPos += 10;

    // Section 3: Senior Treasurer
    doc.setFont("Times", "bold");
    doc.text(`3. Name of Senior Treasurer:`, margin, yPos);
    doc.setFont("Times", "normal");
    doc.text(`${data.treasurerTitle} ${data.treasurerName}`, margin + 60, yPos);
    yPos += lineHeight;
    
    doc.text(`Designation/Department:    ${data.treasurerDesignation}`, margin + 4, yPos);
    yPos += lineHeight;
    doc.text(`Private Address:   ${data.treasurerAddress}`, margin + 4, yPos);
    yPos += lineHeight;
    doc.text(`Tel No: Office     ${data.treasurerOfficeNo} Residence     ${data.treasurerResidenceNo} Mobile    ${data.treasurerMobileNo}`, margin + 4, yPos);
    yPos += lineHeight;
    doc.text(`E-mail Address:   ${data.treasurerMail}`, margin + 4, yPos);
    yPos += 15;

    // Section 4: Advisory Board Table
    doc.setFont("Times", "bold");
    doc.text("4. Members of Advisory Board:", margin, yPos);
    yPos += 10;

    const advisoryHeaders = [["Name", "Designation", "Department"]];
    const advisoryData = data.advisoryMembers.map(m => [m.name || "", m.designation || "", m.department || ""]);
    
    doc.autoTable({
        startY: yPos,
        head: advisoryHeaders,
        body: advisoryData,
        margin: { left: margin + 4},
        styles: { 
            font: "Times",
            fontStyle: "bold",
            lineColor: [0, 0, 0],
            lineWidth: 0.2
        },
        headStyles: { fontStyle: "bold" },
        bodyStyles: { fontStyle: "normal" },
        theme:"plain"
    });
    yPos = doc.autoTable.previous.finalY + 10;

    // Section 5: Bank Details
    doc.setFont("Times", "bold");
    doc.text("5. Bank Account number of the Society:", margin, yPos);
    doc.setFont("Times", "normal");
    doc.text(`${data.bankAccount}`, margin + 85, yPos);
    yPos += lineHeight;
    doc.setFont("Times", "bold");
    doc.text("Name of Bank:", margin + 4, yPos);
    doc.setFont("Times", "normal");
    doc.text(`${data.bankName}`, margin + 40, yPos);
    yPos += 15;

    // Section 6.1: Office Bearers
    doc.setFont("Times", "bold");
    doc.text("6.1 Office Bearers", margin, yPos);
    yPos += 10;

    // President Table
    const createOfficeBearerTable = (title, dataObj) => {
        doc.setFont("Times", "bold");
        doc.text(`${title}:`, margin, yPos);
        yPos += lineHeight;
        
        const presidentData = [
            // ["Student Reg No", "Name", "Signature"],
            // [dataObj.regNo, dataObj.name, ""],
            ["Student Reg No     ",dataObj.regNo ],
            ["Name               ", dataObj.name],
            ["Permanent Address  ", dataObj.address],
            [`Tel No: Residence  - ${dataObj.residenceNo}`, `Mobile - ${dataObj.mobileNo}`],
            ["Signature          ", ""]
        ];

        doc.autoTable({
            startY: yPos,
            body: presidentData,
            margin: { left: margin },
            styles: { 
                font: "Times",
                lineColor: [0, 0, 0],
                lineWidth: 0,
                cellPadding: 1.5
            },
            headStyles: { fontStyle: "bold" },
            bodyStyles: { fontStyle: "normal" },
            theme: "plain",
            tableWidth: 180,
            columnStyles: {
                0: { cellWidth: 80, fontStyle: 'bold' },
                1: { cellWidth: 100 }
            },
            cellStyles: {
                '1,-1': { // Target last row's second cell
                    lineWidth: 0.5,
                    minCellHeight: 20 // Signature box height
                }
            }
        });
        yPos = doc.autoTable.previous.finalY + 15;
    };

    createOfficeBearerTable("President", data.president);
    createOfficeBearerTable("Vice President", data.vicePresident);
    createOfficeBearerTable("Junior Treasurer", data.juniorTreasurer);
    createOfficeBearerTable("Secretary", data.secretary);
    createOfficeBearerTable("Joint Secretary", data.jointSecretary);
    createOfficeBearerTable("Editor", data.editor);
    
    // Continue with other office bearers...

    // // ===== PAGE 2 =====
    // doc.addPage();
    // yPos = 20;

    // Section 6.2: Committee Members
    checkPageLimit();
    doc.setFont("Times", "bold");
    doc.text("6.2 Committee Members as per Constitution of the Society:", margin, yPos);
    yPos += 10;

    const committeeHeaders = [["Student Reg No", "Name", "Signature"]];
    const committeeData = data.committeeMembers.map(m => [m.regNo, m.name, ""]);
    
    doc.autoTable({
        startY: yPos,
        head: committeeHeaders,
        body: committeeData,
        margin: { left: margin + 4 },
        styles: { 
            font: "Times",
            lineColor: [0, 0, 0],
            lineWidth: 0.2
        },
        headStyles: { fontStyle: "bold" },
        theme: "plain"
    });
    yPos = doc.autoTable.previous.finalY + 10;

    // doc.addPage();
    // yPos = 20;
    // Section 6.3: AGM Date
    doc.setFont("Times", "bold");
    doc.text("6.3 Date of the Annual General Meeting held:", margin, yPos);
    doc.setFont("Times", "normal");
    doc.text(data.agmDate, margin + 85, yPos);
    yPos += 15;


    // Ensure registeredMembers is defined
    let memberCount = (data.registeredMembers && Array.isArray(data.registeredMembers)) 
        ? data.registeredMembers.length 
        : 0;

    // Section 7: Number of Members
    doc.setFont("Times", "bold");
    doc.text("7. Number of Members :", margin, yPos);
    doc.setFont("Times", "normal");
    doc.text(memberCount.toString(), margin + 55, yPos);
    yPos += 15;

    // Ensure plannedActivities is defined
    let plannedActivitiesData = (data.plannedActivities && Array.isArray(data.plannedActivities) && data.plannedActivities.length > 0) 
        ? data.plannedActivities.map(m => [m.month || "-", m.activity || "-"])
        : [["-", "-"]]; // Default empty row if no data

    // Section 8: Planned Activities
    doc.setFont("Times", "bold");
    doc.text("8. Please indicate the proposed programmes earmarked by the Society for the next year.", margin, yPos);
    yPos += 10;

    const plannedActivitiesHeaders = [["Month", "Planned Activity"]];

    doc.autoTable({
        startY: yPos,
        head: plannedActivitiesHeaders,
        body: plannedActivitiesData,
        margin: { left: margin + 4 },
        styles: { 
            font: "Times",
            lineColor: [0, 0, 0],
            lineWidth: 0.2
        },
        headStyles: { fontStyle: "bold" },
        theme: "plain"
    });

    yPos = doc.autoTable.previous.finalY + 10;





    yPos +=15;
    doc.setFont("Times", "normal");
    doc.text(".......................................................                                       .......................................................", margin + 4, yPos);
    yPos += 10;
    doc.text("      Signature of President                                                          Signature of Secretary",margin + 4, yPos);
    yPos += 20;
    doc.text("I do hereby certify that the particulars given above are true and accurate and pleased ", margin + 4, yPos);
    yPos +=5
    doc.text("to submit the statements of Income and Expenditure for the kind perusal",margin+4, yPos);
    yPos +=25;
    doc.setFont("Times", "normal");
    doc.text(".......................................................                                       .......................................................", margin + 4, yPos);
    yPos += 10;
    doc.text("                        Date                                                                    Signature of Secretary",margin + 4, yPos);
    yPos +=25;


    doc.setFont("Times","bold");
    doc.text("Recommendation of the Senior Treasurer :", margin, yPos);
    yPos +=15;
    doc.setFont("Times","normal");
    doc.text("This is to certify that I am personally aware and satisfied with the progress and ", margin+4, yPos);
    yPos+=5;
    doc.text("achievements made in section 8 and the proposed programs earmarked in section 10.", margin+4, yPos);
    yPos+=25;
    doc.text(".......................................................                                       .......................................................", margin + 4, yPos);
    yPos += 10;
    doc.text("                        Date                                                                      Senior Treasurer",margin + 4, yPos);
    yPos +=25;

    doc.setFont("Times","bold");
    doc.text("Recommendation of the Advisory Board :", margin, yPos);
    yPos+=25;
    doc.setFont("Times","normal");
    doc.text(".......................................................                                       .......................................................", margin + 4, yPos);
    yPos += 10;
    doc.text("                        Date                                                               Chairman of the Advisory Board",margin + 4, yPos);
    yPos +=25;

    doc.line(margin, yPos, 180, yPos); // Adjust line position & width
    yPos += 15;
    // doc.addPage();
    // yPos = 20;
    doc.setFont("Times","bold");
    doc.text("Concurrence of the Dean of Faculty :", margin, yPos);
    yPos+=25;
    doc.setFont("Times","normal");
    doc.text(".......................................................                                       .......................................................", margin + 4, yPos);
    yPos += 10;
    doc.text("                        Date                                                                                       Dean",margin + 4, yPos);
    yPos+=5;
    doc.text("                                                                                                        (Please affix offcial seal)", margin +4,yPos);
    yPos +=25;


    doc.setFont("Times","bold");
    doc.text("Approval of the Deputy Registrar / Student Services :", margin, yPos);
    yPos+=15;
    doc.setFont("Times","normal");
    doc.text("The application is / is not duly completed.", margin + 4, yPos);
    yPos+=25;
    doc.text(".......................................................                                       .......................................................", margin + 4, yPos);
    yPos += 10;
    doc.text("                        Date                                                                         Deputy Registrar",margin + 4, yPos);
    yPos+=5;
    doc.text("                                                                                                        Student Services.", margin +4,yPos);
    yPos +=25;


    doc.setFont("Times","bold");
    doc.text("Approval of the Vice-Chancellor / Deputy Vice-Chancellor :", margin, yPos);
    yPos+=25;
    doc.setFont("Times","normal")
    doc.text(".......................................................                                       .......................................................", margin + 4, yPos);
    yPos += 10;
    doc.text("                        Date                                                   Vice-Chancellor / Deputy Vice-Chancellor",margin + 4, yPos);
    yPos+=5;
    doc.text("                                                                                                   (Please affix official seal)", margin +4,yPos);
    yPos +=25;





    // ===== PAGE 5 ===== (Registered Members)
    doc.addPage();
    yPos = 20;

    doc.setFont("Times", "bold");
    doc.text("List of Registered Members", margin, yPos);
    yPos += 10;

    const regMembersHeaders = [["No.", "Student Reg No", "Name", "Signature"]];
    const regMembersData = data.registeredMembers.map((m, index) => [
        index + 1,
        m.regNo,
        m.name,
        ""
    ]);

    doc.autoTable({
        startY: yPos,
        head: regMembersHeaders,
        body: regMembersData,
        margin: { left: margin },
        styles: { 
            font: "Times",
            lineColor: [0, 0, 0],
            lineWidth: 0.2
        },
        headStyles: { fontStyle: "bold" },
        theme: "plain",
        columnStyles: {
            0: { cellWidth: 15 },
            3: { cellWidth: 60 }
        }
    });
    yPos = doc.autoTable.previous.finalY + 10;
    yPos +=15;
    doc.setFont("Times", "normal");
    doc.text(".......................................................                                       .......................................................", margin + 4, yPos);
    yPos += 10;
    doc.text("      Signature of President                                                          Signature of Secretary",margin + 4, yPos);
    

    // Save PDF
    doc.save('Society_Application.pdf');
}

function submitSociety() {
    const societyData = getFormData();

    let pendingSocieties = JSON.parse(localStorage.getItem("pendingSocieties")) || [];
    pendingSocieties.push(societyData);

    localStorage.setItem("pendingSocieties", JSON.stringify(pendingSocieties));

    // alert("Your society application has been sent for approval.");
    showMessage();
}

function saveSocietyData() {
    let societies = JSON.parse(localStorage.getItem("societies")) || [];

    let societyData = {
        fileNumber: document.getElementById("fileNumber").innerText,
        societyName: document.getElementById("societyName").value,
        treasurerTitle: document.getElementById("treasurerTitle").value,
        treasurerName: document.getElementById("treasurerName").value,
        bankAccount: document.getElementById("bankAccount").value,
        advisoryBoard: [],
        members: [],
        activities: []
    };

    document.querySelectorAll("#advisoryBoard .advisory-row").forEach(row => {
        societyData.advisoryBoard.push({
            name: row.querySelector(".adv-name").value,
            designation: row.querySelector(".adv-designation").value,
            department: row.querySelector(".adv-department").value
        });
    });

    document.querySelectorAll("#registeredMembers .rm-row").forEach(row => {
        societyData.members.push({
            regNo: row.querySelector(".rm-month").value,
            name: row.querySelector(".rm-name").value
        });
    });

    document.querySelectorAll("#plannedActivity .plannedActivity-row").forEach(row => {
        societyData.activities.push({
            month: row.querySelector(".plannedActivity-month").value,
            name: row.querySelector(".plannedActivity-name").value
        });
    });

    societies.push(societyData);
    localStorage.setItem("societies", JSON.stringify(societies));

    alert("Society Data Saved Successfully!");
}


function showMessage(message, type) {
    const messageContainer = document.getElementById("messageContainer");
    messageContainer.textContent = message;
    
    // Apply styles based on type
    messageContainer.className = `message-container ${type} show`;

    // Remove message after 3 seconds
    // setTimeout(() => {
    //     messageContainer.classList.remove("show");
    //     messageContainer.style.display = "none";
    // }, 3000);
}

// Event Handlers for Buttons
document.querySelector(".primary").addEventListener("click", function() {
    showMessage(`You should submit hard copy into Student Service Division before "${issueDate()+ 7}`, "success");
});

// document.querySelector(".secondary").addEventListener("click", function() {
//     showMessage("Your society application has been sent for approval.\nYou should submit hard copy into Student Service Division before ${issueDate()+ 7}", "error");
// });

document.querySelector(".secondary").addEventListener("click", function() {
    // Get current date (submission date)
    let submissionDate = new Date(); 

    // Add 7 days to the submission date
    submissionDate.setDate(submissionDate.getDate() + 7);

    // Format the new date as YYYY/MM/DD
    let formattedDate = submissionDate.getFullYear() + "/" + 
                        String(submissionDate.getMonth() + 1).padStart(2, '0') + "/" + 
                        String(submissionDate.getDate()).padStart(2, '0');

    // Show message with the calculated submission deadline
    showMessage(`Your society application has been sent for approval.\nYou should submit a hard copy to the Student Service Division before ${formattedDate}.`, "error");
});

// document.querySelector(".btn.secondary").addEventListener("click", function() {
//     // Save draft logic
//     const data = getFormData();
//     let pendingSocieties = JSON.parse(localStorage.getItem("pendingSocieties")) || [];
//     pendingSocieties.push(data);
//     localStorage.setItem("pendingSocieties", JSON.stringify(pendingSocieties));

//     // Show message
//     let submissionDate = new Date();
//     submissionDate.setDate(submissionDate.getDate() + 7);
//     let formattedDate = submissionDate.toISOString().split('T')[0].replace(/-/g, "/");
//     showMessage(`Your society application has been sent for approval.\nYou should submit a hard copy to the Student Service Division before ${formattedDate}.`, "error");
// });
