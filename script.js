document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('qr-text');
    const generateBtn = document.getElementById('generate-btn');
    const qrContainer = document.getElementById('qrcode');
    const placeholder = document.getElementById('placeholder-text');
    const actionsPanel = document.getElementById('actions-panel');
    const downloadBtn = document.getElementById('download-btn');

    let qrcode = new QRCode(qrContainer, {
        width: 180,
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    const generateQR = () => {
        const text = textInput.value.trim();

        if (!text) {
            textInput.classList.add('shake');
            setTimeout(() => textInput.classList.remove('shake'), 500);
            return;
        }

        // Clear existing, effectively handled by makeCode but nice to control flow
        qrcode.makeCode(text);

        // UI updates
        placeholder.classList.add('hidden');
        qrContainer.classList.add('visible');
        actionsPanel.style.display = 'block';

        // Animate
        qrContainer.style.transform = 'scale(0.95)';
        setTimeout(() => qrContainer.style.transform = 'scale(1)', 150);
    };

    // Add Shake Animation Style dynamically
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
    `;
    document.head.appendChild(styleSheet);


    generateBtn.addEventListener('click', generateQR);

    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') generateQR();
    });

    downloadBtn.addEventListener('click', () => {
        const img = qrContainer.querySelector('img');
        if (img && img.src) {
            const link = document.createElement('a');
            link.href = img.src;
            link.download = 'qrcode.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });

    // Clear QR when input is cleared? Optional.
    // textInput.addEventListener('input', () => {
    //     if(textInput.value === '') {
    //         qrcode.clear(); // This method might not exist on all versions, better to just leave previous
    //     }
    // });
});
