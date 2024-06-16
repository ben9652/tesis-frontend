export class DeviceDetectorUtil {
    static isMobile(): boolean {
        return /Mobile|mobile|Android|iPhone/i.test(navigator.userAgent);
    }

    static isTablet(): boolean {
        return /Tablet|iPad/i.test(navigator.userAgent);
    }

    static isDesktop(): boolean {
        return !DeviceDetectorUtil.isMobile() && !DeviceDetectorUtil.isTablet();
    }
}