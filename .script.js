// بيانات الموقع الافتراضية
const DEFAULT_DATA = {
    site_title: "SHARK TRADING",
    slogan: "MAIN - Professional Trading Solutions",
    logo: null,
    social_links: {
        instagram: "https://instagram.com/sharktrading",
        facebook: "https://facebook.com/sharktrading",
        twitter: "https://twitter.com/sharktrading",
        tiktok: "https://tiktok.com/@sharktrading",
        telegram: "https://t.me/sharktrading",
        youtube: "https://youtube.com/@sharktrading",
        whatsapp: "https://wa.me/1234567890",
        linkedin: "https://linkedin.com/company/sharktrading",
        snapchat: "https://snapchat.com/add/sharktrading",
        threads: "https://threads.net/sharktrading"
    },
    visitor_count: 0,
    news: [],
    videos: []
};

// تحميل البيانات من LocalStorage
function loadSiteData() {
    const saved = localStorage.getItem('shark_trading_data');
    return saved ? JSON.parse(saved) : {...DEFAULT_DATA};
}

// حفظ البيانات في LocalStorage
function saveSiteData(data) {
    localStorage.setItem('shark_trading_data', JSON.stringify(data));
}

// تحديث عداد الزوار
function updateVisitorCount() {
    const data = loadSiteData();
    data.visitor_count = (data.visitor_count || 0) + 1;
    saveSiteData(data);
    document.getElementById('visitorCount').textContent = data.visitor_count;
}

// تحميل وتحديث واجهة الموقع
function updateSiteInterface() {
    const data = loadSiteData();
    
    // تحديث العنوان والشعار
    document.getElementById('siteTitle').textContent = data.site_title;
    document.getElementById('siteSlogan').textContent = data.slogan;
    
    // تحديث الشعار
    const logoImg = document.getElementById('siteLogo');
    if (data.logo) {
        logoImg.src = data.logo;
        logoImg.style.display = 'block';
    }
    
    // تحديث روابط السوشيال ميديا
    updateSocialLinks(data.social_links);
    
    // تحديث الأخبار
    updateNews(data.news);
    
    // تحديث الفيديوهات
    updateVideos(data.videos);
    
    // تحديث Floating Threads
    updateFloatingThreads(data.social_links.threads);
}

// تحديث روابط السوشيال ميديا
function updateSocialLinks(socialLinks) {
    const container = document.getElementById('socialLinks');
    const platforms = {
        instagram: ['إنستجرام', 'fab fa-instagram'],
        facebook: ['فيسبوك', 'fab fa-facebook-f'],
        twitter: ['تويتر', 'fab fa-twitter'],
        tiktok: ['تيك توك', 'fab fa-tiktok'],
        telegram: ['تلجرام', 'fab fa-telegram'],
        youtube: ['يوتيوب', 'fab fa-youtube'],
        whatsapp: ['واتساب', 'fab fa-whatsapp'],
        linkedin: ['لينكدإن', 'fab fa-linkedin-in'],
        snapchat: ['سناب شات', 'fab fa-snapchat-ghost'],
        threads: ['ثريدز', 'fab fa-threads']
    };
    
    let html = '';
    for (const [platform, [name, icon]] of Object.entries(platforms)) {
        if (socialLinks[platform]) {
            html += `
                <a href="${socialLinks[platform]}" target="_blank" class="social-link ${platform}">
                    <i class="${icon} social-icon"></i>
                    <span class="social-name">${name}</span>
                </a>
            `;
        }
    }
    container.innerHTML = html;
}

// تحديث الأخبار
function updateNews(news) {
    const container = document.getElementById('newsContainer');
    
    if (news.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-newspaper fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">لا توجد أخبار حالياً</h5>
                <p class="text-muted">سيتم نشر آخر الأخبار قريباً</p>
            </div>
        `;
        return;
    }
    
    let html = '<div class="row">';
    news.slice(0, 6).forEach(item => {
        html += `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="news-card">
                    ${item.image ? 
                        `<img src="${item.image}" alt="${item.title}" class="news-image">` :
                        `<div class="news-image bg-light d-flex align-items-center justify-content-center">
                            <i class="fas fa-newspaper fa-3x text-muted"></i>
                         </div>`
                    }
                    <div class="news-content">
                        <h3 class="news-title">${item.title}</h3>
                        <div class="news-date">
                            <i class="fas fa-calendar me-1"></i>${item.date}
                        </div>
                        <p class="news-description">${item.description.substring(0, 100)}...</p>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

// تحديث الفيديوهات
function updateVideos(videos) {
    const container = document.getElementById('videosContainer');
    
    if (videos.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-video fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">لا توجد فيديوهات حالياً</h5>
                <p class="text-muted">سيتم نشر الفيديوهات قريباً</p>
            </div>
        `;
        return;
    }
    
    let html = '<div class="row">';
    videos.slice(0, 4).forEach(video => {
        html += `
            <div class="col-md-6 mb-4">
                <div class="video-card">
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/${video.video_id}" 
                                allowfullscreen>
                        </iframe>
                    </div>
                    <div class="video-content">
                        <h3 class="video-title">${video.title}</h3>
                        <div class="video-date">
                            <i class="fas fa-calendar me-1"></i>${video.date}
                        </div>
                        <p class="video-description">${video.description.substring(0, 150)}...</p>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

// تحديث Floating Threads
function updateFloatingThreads(threadsLink) {
    const floating = document.getElementById('floatingThreads');
    if (threadsLink) {
        floating.href = threadsLink;
        floating.style.display = 'flex';
    } else {
        floating.style.display = 'none';
    }
}

// إدارة تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'admin123') {
        // إخفاء نموذج تسجيل الدخول
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('admin-login'));
        loginModal.hide();
        
        // عرض لوحة التحكم
        showAdminPanel();
    } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
});

// عرض لوحة التحكم
function showAdminPanel() {
    loadAdminContent();
    const adminModal = new bootstrap.Modal(document.getElementById('admin-panel'));
    adminModal.show();
}

// تحميل محتوى لوحة التحكم
function loadAdminContent() {
    const data = loadSiteData();
    const container = document.getElementById('adminContent');
    
    container.innerHTML = `
        <div class="row">
            <div class="col-md-3 mb-3">
                <div class="list-group">
                    <button class="list-group-item list-group-item-action active" onclick="showAdminSection('dashboard')">
                        لوحة التحكم
                    </button>
                    <button class="list-group-item list-group-item-action" onclick="showAdminSection('news')">
                        إدارة الأخبار
                    </button>
                    <button class="list-group-item list-group-item-action" onclick="showAdminSection('videos')">
                        إدارة الفيديوهات
                    </button>
                    <button class="list-group-item list-group-item-action" onclick="showAdminSection('social')">
                        روابط السوشيال
                    </button>
                    <button class="list-group-item list-group-item-action" onclick="showAdminSection('settings')">
                        إعدادات الموقع
                    </button>
                </div>
            </div>
            <div class="col-md-9">
                <div id="adminSectionContent">
                    <!-- محتوى القسم سيتم تحميله هنا -->
                </div>
            </div>
        </div>
    `;
    
    showAdminSection('dashboard');
}

// عرض قسم معين في لوحة التحكم
function showAdminSection(section) {
    const container = document.getElementById('adminSectionContent');
    const data = loadSiteData();
    
    switch(section) {
        case 'dashboard':
            container.innerHTML = showDashboardSection(data);
            break;
        case 'news':
            container.innerHTML = showNewsSection(data);
            break;
        case 'videos':
            container.innerHTML = showVideosSection(data);
            break;
        case 'social':
            container.innerHTML = showSocialSection(data);
            break;
        case 'settings':
            container.innerHTML = showSettingsSection(data);
            break;
    }
}

// قسم لوحة التحكم الرئيسية
function showDashboardSection(data) {
    const socialCount = Object.values(data.social_links).filter(link => link).length;
    
    return `
        <h4>لوحة التحكم الرئيسية</h4>
        <div class="row text-center mb-4">
            <div class="col-md-3">
                <div class="card bg-primary text-white">
                    <div class="card-body">
                        <h5>${data.visitor_count || 0}</h5>
                        <p>عدد الزوار</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card bg-success text-white">
                    <div class="card-body">
                        <h5>${data.news.length}</h5>
                        <p>عدد الأخبار</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card bg-info text-white">
                    <div class="card-body">
                        <h5>${data.videos.length}</h5>
                        <p>عدد الفيديوهات</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card bg-warning text-white">
                    <div class="card-body">
                        <h5>${socialCount}/10</h5>
                        <p>روابط مفعلة</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h5>تحديث الشعار</h5>
            </div>
            <div class="card-body">
                <input type="file" id="logoUpload" accept="image/*" class="form-control mb-3">
                <button onclick="uploadLogo()" class="btn btn-primary">رفع الشعار</button>
            </div>
        </div>
    `;
}

// قسم إدارة الأخبار
function showNewsSection(data) {
    let newsHTML = '';
    data.news.forEach((item, index) => {
        newsHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5>${item.title}</h5>
                    <p>${item.description}</p>
                    <small class="text-muted">${item.date}</small>
                    <button onclick="deleteNews(${index})" class="btn btn-danger btn-sm float-start">حذف</button>
                </div>
            </div>
        `;
    });
    
    return `
        <h4>إدارة الأخبار</h4>
        <div class="card mb-4">
            <div class="card-header">
                <h5>إضافة خبر جديد</h5>
            </div>
            <div class="card-body">
                <form id="addNewsForm">
                    <div class="mb-3">
                        <input type="text" class="form-control" id="newsTitle" placeholder="عنوان الخبر" required>
                    </div>
                    <div class="mb-3">
                        <textarea class="form-control" id="newsDescription" placeholder="وصف الخبر" rows="3" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-success">إضافة الخبر</button>
                </form>
            </div>
        </div>
        
        <h5>الأخبار الحالية</h5>
        ${data.news.length === 0 ? '<p class="text-muted">لا توجد أخبار</p>' : newsHTML}
    `;
}

// قسم إدارة الفيديوهات
function showVideosSection(data) {
    let videosHTML = '';
    data.videos.forEach((video, index) => {
        videosHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5>${video.title}</h5>
                    <p>${video.description}</p>
                    <small class="text-muted">${video.date}</small>
                    <button onclick="deleteVideo(${index})" class="btn btn-danger btn-sm float-start">حذف</button>
                </div>
            </div>
        `;
    });
    
    return `
        <h4>إدارة الفيديوهات</h4>
        <div class="card mb-4">
            <div class="card-header">
                <h5>إضافة فيديو جديد</h5>
            </div>
            <div class="card-body">
                <form id="addVideoForm">
                    <div class="mb-3">
                        <input type="text" class="form-control" id="videoTitle" placeholder="عنوان الفيديو" required>
                    </div>
                    <div class="mb-3">
                        <input type="url" class="form-control" id="videoUrl" placeholder="رابط YouTube" required>
                    </div>
                    <div class="mb-3">
                        <textarea class="form-control" id="videoDescription" placeholder="وصف الفيديو" rows="2"></textarea>
                    </div>
                    <button type="submit" class="btn btn-success">إضافة الفيديو</button>
                </form>
            </div>
        </div>
        
        <h5>الفيديوهات الحالية</h5>
        ${data.videos.length === 0 ? '<p class="text-muted">لا توجد فيديوهات</p>' : videosHTML}
    `;
}

// قسم روابط السوشيال
function showSocialSection(data) {
    return `
        <h4>إدارة روابط التواصل الاجتماعي</h4>
        <div class="card">
            <div class="card-body">
                <form id="socialForm">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">إنستجرام</label>
                            <input type="url" class="form-control" name="instagram" value="${data.social_links.instagram || ''}">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">فيسبوك</label>
                            <input type="url" class="form-control" name="facebook" value="${data.social_links.facebook || ''}">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">تويتر</label>
                            <input type="url" class="form-control" name="twitter" value="${data.social_links.twitter || ''}">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">تيك توك</label>
                            <input type="url" class="form-control" name="tiktok" value="${data.social_links.tiktok || ''}">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">تلجرام</label>
                            <input type="url" class="form-control" name="telegram" value="${data.social_links.telegram || ''}">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">يوتيوب</label>
                            <input type="url" class="form-control" name="youtube" value="${data.social_links.youtube || ''}">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">واتساب</label>
                            <input type="url" class="form-control" name="whatsapp" value="${data.social_links.whatsapp || ''}">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">لينكدإن</label>
                            <input type="url" class="form-control" name="linkedin" value="${data.social_links.linkedin || ''}">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">سناب شات</label>
                            <input type="url" class="form-control" name="snapchat" value="${data.social_links.snapchat || ''}">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">ثريدز</label>
                            <input type="url" class="form-control" name="threads" value="${data.social_links.threads || ''}">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">حفظ التغييرات</button>
                </form>
            </div>
        </div>
    `;
}

// قسم إعدادات الموقع
function showSettingsSection(data) {
    return `
        <h4>إعدادات الموقع</h4>
        <div class="card">
            <div class="card-body">
                <form id="settingsForm">
                    <div class="mb-3">
                        <label class="form-label">اسم الموقع</label>
                        <input type="text" class="form-control" name="site_title" value="${data.site_title}" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">الشعار الوصفي</label>
                        <input type="text" class="form-control" name="slogan" value="${data.slogan}">
                    </div>
                    <button type="submit" class="btn btn-primary">حفظ الإعدادات</button>
                </form>
            </div>
        </div>
    `;
}

// === دوال الإدارة ===

// رفع الشعار
function uploadLogo() {
    const fileInput = document.getElementById('logoUpload');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = loadSiteData();
            data.logo = e.target.result;
            saveSiteData(data);
            updateSiteInterface();
            alert('تم تحديث الشعار بنجاح');
        };
        reader.readAsDataURL(file);
    }
}

// إضافة خبر جديد
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addNewsForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('newsTitle').value;
        const description = document.getElementById('newsDescription').value;
        
        const data = loadSiteData();
        data.news.unshift({
            title: title,
            description: description,
            date: new Date().toLocaleDateString('ar-EG'),
            image: null
        });
        
        saveSiteData(data);
        updateSiteInterface();
        showAdminSection('news');
        
        // إعادة تعيين النموذج
        this.reset();
    });
    
    // إضافة فيديو جديد
    document.getElementById('addVideoForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('videoTitle').value;
        const url = document.getElementById('videoUrl').value;
        const description = document.getElementById('videoDescription').value;
        
        // استخراج معرف الفيديو من الرابط
        const videoId = extractYouTubeId(url);
        if (!videoId) {
            alert('رابط YouTube غير صالح');
            return;
        }
        
        const data = loadSiteData();
        data.videos.unshift({
            title: title,
            description: description,
            video_id: videoId,
            date: new Date().toLocaleDateString('ar-EG')
        });
        
        saveSiteData(data);
        updateSiteInterface();
        showAdminSection('videos');
        
        this.reset();
    });
    
    // حفظ إعدادات السوشيال
    document.getElementById('socialForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = loadSiteData();
        
        for (const [key, value] of formData.entries()) {
            data.social_links[key] = value;
        }
        
        saveSiteData(data);
        updateSiteInterface();
        alert('تم حفظ الروابط بنجاح');
    });
    
    // حفظ إعدادات الموقع
    document.getElementById('settingsForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = loadSiteData();
        
        data.site_title = formData.get('site_title');
        data.slogan = formData.get('slogan');
        
        saveSiteData(data);
        updateSiteInterface();
        alert('تم حفظ الإعدادات بنجاح');
    });
});

// حذف خبر
function deleteNews(index) {
    if (confirm('هل أنت متأكد من حذف هذا الخبر؟')) {
        const data = loadSiteData();
        data.news.splice(index, 1);
        saveSiteData(data);
        updateSiteInterface();
        showAdminSection('news');
    }
}

// حذف فيديو
function deleteVideo(index) {
    if (confirm('هل أنت متأكد من حذف هذا الفيديو؟')) {
        const data = loadSiteData();
        data.videos.splice(index, 1);
        saveSiteData(data);
        updateSiteInterface();
        showAdminSection('videos');
    }
}

// استخراج معرف YouTube من الرابط
function extractYouTubeId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
}

// التهيئة الأولية
document.addEventListener('DOMContentLoaded', function() {
    updateVisitorCount();
    updateSiteInterface();
});
