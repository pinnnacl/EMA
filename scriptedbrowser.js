// Set the URL of your website
const websiteUrl = 'http://3.89.35.145:5000/'; // Replace with your website URL

// Define the script for monitoring
$browser.get(websiteUrl).then(async function() {
    try {
        // Step 1: Check if the website is up
        await $browser.waitForElement('title', 10000);  // Wait for the title to be available (indicating the page is up)
        console.log("Website is up and running!");

        // Step 2: Click the 'Add Employee' anchor link
        const addEmployeeLink = await $browser.findElement('a', { text: 'Add Employee' });  // Find link by text
        await addEmployeeLink.click();
        await $browser.waitForElement('#add-employee-form', 10000); // Ensure the Add Employee form is loaded
        console.log("Add Employee page loaded successfully.");

        // Step 3: Input data in the 'Add Employee' page
        const nameField = await $browser.findElement('#name'); // CSS selector for the name field
        const contactField = await $browser.findElement('#nontact'); // CSS selector for the contact field
        const submitButton = await $browser.findElement('.btn-primary'); // CSS class selector for the submit button
        
        await nameField.sendKeys('John Doe');  // Replace with dynamic data if needed
        await contactField.sendKeys('0000000000');  // Replace with dynamic data if needed
        await submitButton.click();
        console.log("Data entered and submitted successfully on Add Employee page.");
        
        // Step 4: Verify if the List Employees page is available
        const listEmployeesButton = await $browser.findElement('a', { text: 'List Employee' }); // Find link by text
        await listEmployeesButton.click();
        await $browser.waitForUrlContains('list-employees', 10000);  // Wait for the URL to change or for the page to load
        console.log("List Employees page is accessible.");
        
    } catch (error) {
        console.error("An error occurred during the monitoring test:", error);
    }
});
