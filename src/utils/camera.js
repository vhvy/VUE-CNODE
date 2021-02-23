async function getUserCameras() {
    const handleError = () => {
        throw new Error("找不到摄像头!");
    };

    try {
        const devices = await window.Html5Qrcode.getCameras();
        if (devices && devices?.length > 0) {
            return devices;
        } else {
            handleError();
        }
        // this.cameras = devices;
    } catch (error) {
        console.log(error);
        handleError();
    }
}

export default getUserCameras;