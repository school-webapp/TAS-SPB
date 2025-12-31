// ios-fix.js
// Script สำหรับแก้ปัญหา iOS Web App เด้งไปเปิด Safari เมื่อกดลิงก์

(function(document, navigator, standalone) {
    // ตรวจสอบว่าเปิดในโหมด Standalone (Web App) ของ iOS หรือไม่
    if ((standalone in navigator) && navigator[standalone]) {
        
        var curnode, location = document.location, stop = /^(a|html)$/i;
        
        document.addEventListener('click', function(e) {
            curnode = e.target;
            
            // หา tag <a> ที่ใกล้ที่สุด (กรณีคลิกโดนไอคอนหรือตัวหนังสือในลิงก์)
            while (!stop.test(curnode.nodeName)) {
                curnode = curnode.parentNode;
            }
            
            // ถ้าเป็น tag <a> และมี href
            if ('href' in curnode && (curnode.href.indexOf('http') || ~curnode.href.indexOf(location.host))) {
                // ป้องกันการทำงานปกติ (ที่มักจะเปิดหน้าต่างใหม่)
                e.preventDefault();
                // สั่งให้เปลี่ยนหน้าในหน้าต่างเดิม
                window.location.href = curnode.href;
            }
        }, false);
    }
})(document, window.navigator, 'standalone');
