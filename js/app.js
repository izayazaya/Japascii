document.addEventListener("DOMContentLoaded", () => {

    // Variables
    const about = document.getElementById("about");
    const contact = document.getElementById("contact");
    const textToAscii = document.getElementById("textToAscii");
    const imageToAscii = document.getElementById("imageToAscii");

    function showAbout(event) {
        event.preventDefault();
        textToAscii.innerHTML = '';
        const aboutContainer = document.createElement("div");
        aboutContainer.id = "aboutContainer";
        aboutContainer.innerHTML = `
            <p id="aboutTitle">ABOUT</p>
            <p id="aboutContents">lorem ipsum</p>
        `;
        textToAscii.appendChild(aboutContainer);
        about.classList.add('disableBtn');

        const backBtn = document.createElement('button');
        backBtn.textContent = 'Go back';
        backBtn.id = 'backBtn';
        aboutContainer.appendChild(backBtn);

        backBtn.addEventListener('click', initializeApps);
    } 

    function showContact(event) {
        event.preventDefault();
        imageToAscii.innerHTML = '';
        const contactContainer = document.createElement("div");
        contactContainer.id = "contactContainer";
        contactContainer.innerHTML = `
            <p id="contactTitle">CONTACT</p>
            <p id="contactContents">lorem ipsum</p>
        `;
        imageToAscii.appendChild(contactContainer);
        contact.classList.add('disableBtn');

        const backBtn = document.createElement('button');
        backBtn.textContent = 'Go back';
        backBtn.id = 'backBtn';
        contactContainer.appendChild(backBtn);

        backBtn.addEventListener('click', initializeApps);
    }

    function initializeApps() {
        about.classList.remove('disableBtn');
        contact.classList.remove('disableBtn');
        textToAscii.innerHTML = '';
        imageToAscii.innerText = '';

        textToAscii.innerHTML = `
            <h2 class="toolTitle">Text to ASCII Art Generator</h2>
            <div id="inputContainer">
                <form>
                    <h3>Input text</h3>
                    <textarea type="text" id="liveInput" rows="5" cols="30" placeholder="Type your message here..."></textarea>
                    </form>
                </div>
            <div id="outputContainer">
                <h3>Output</h3>
                <div id="outputTextContainer">
                    <p id="outputText">Output will appear here...</p>
                </div>
            </div>
        `;
        imageToAscii.innerHTML = `
            <h2 class="toolTitle">Image to ASCII Art Generator</h2>
        `;

        const inputElement = document.getElementById('liveInput');
        const outputElement = document.getElementById('outputText');

        if (inputElement && outputElement) {
            inputElement.addEventListener('input', (event) => {
                outputElement.textContent = event.target.value;
            });
        } else {
            console.error("Failed to find liveInput or outputText elements.");
        }
    }

    initializeApps();

    about.addEventListener('click', showAbout);
    contact.addEventListener('click', showContact);
});
