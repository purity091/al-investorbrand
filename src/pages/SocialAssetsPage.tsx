import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Facebook, Instagram, Twitter, Linkedin, ImageIcon, Trash2, CheckCircle2 } from 'lucide-react';
import './SocialAssetsPage.css';

interface PlatformAsset {
    id: string;
    name: string;
    icon: React.ElementType;
    color: string;
    coverSize?: { width: number; height: number };
    profileSize: { width: number; height: number };
    description: string;
}

const PLATFORMS: PlatformAsset[] = [
    {
        id: 'x',
        name: 'إكس (Twitter)',
        icon: Twitter,
        color: '#0f1419',
        coverSize: { width: 1500, height: 500 },
        profileSize: { width: 400, height: 400 },
        description: 'المقاس المثالي للغلاف 1500x500 بكسل، وللصورة الشخصية 400x400 بكسل.'
    },
    {
        id: 'linkedin',
        name: 'لينكد إن (LinkedIn)',
        icon: Linkedin,
        color: '#0a66c2',
        coverSize: { width: 1128, height: 191 },
        profileSize: { width: 400, height: 400 },
        description: 'المقاس المثالي للغلاف 1128x191 بكسل، وللصورة الشخصية 400x400 بكسل.'
    },
    {
        id: 'facebook',
        name: 'فيسبوك (Facebook)',
        icon: Facebook,
        color: '#1877f2',
        coverSize: { width: 820, height: 312 },
        profileSize: { width: 176, height: 176 },
        description: 'المقاس المثالي للغلاف 820x312 بكسل، وللصورة الشخصية 176x176 بكسل.'
    },
    {
        id: 'instagram',
        name: 'إنستجرام (Instagram)',
        icon: Instagram,
        color: '#e1306c',
        profileSize: { width: 320, height: 320 },
        description: 'المقاس المثالي للصورة الشخصية 320x320 بكسل. المنصة لا تدعم صور الغلاف.'
    }
];

export const SocialAssetsPage = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (type === 'profile') setProfileImage(event.target?.result as string);
                else setCoverImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const downloadImage = (imgSrc: string, width: number, height: number, filename: string, platformId: string) => {
        setIsGenerating(`${platformId}-${filename}`);

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                // Fill background white just in case of transparency
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, width, height);

                // Calculate object-fit: cover 
                const imageRatio = img.width / img.height;
                const canvasRatio = width / height;
                let drawWidth = width;
                let drawHeight = height;
                let offsetX = 0;
                let offsetY = 0;

                if (imageRatio > canvasRatio) {
                    drawWidth = height * imageRatio;
                    offsetX = (width - drawWidth) / 2;
                } else {
                    drawHeight = width / imageRatio;
                    offsetY = (height - drawHeight) / 2;
                }

                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

                // Convert to blob and download
                canvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);

                        setTimeout(() => setIsGenerating(null), 500);
                    }
                }, 'image/png', 1.0);
            }
        };
        img.src = imgSrc;
    };

    return (
        <div className="social-assets-page">
            <header className="page-header">
                <div className="container">
                    <div className="badge">مولّد هويات المنصات</div>
                    <h1>الأصول البصرية لمنصات التواصل</h1>
                    <p>قم برفع صورة الغلاف والصورة الشخصية الخاصة بالهوية هنا، وسيقوم النظام تلقائياً بضبطها لمقاسات كل منصة (X, LinkedIn, Facebook, Instagram) جاهزة للتحميل بضغطة زر وبمقاسات بكسل دقيقة 100%.</p>
                </div>
            </header>

            <div className="container">
                {/* Uploader Section */}
                <section className="uploader-section">
                    <div className="upload-box">
                        <div className="upload-header">
                            <ImageIcon className="icon" />
                            <h3>صورة الغلاف (Cover)</h3>
                            <span className="recommended">يُفضل مقاس 1500×500 كحد أدنى</span>
                        </div>
                        <div className="upload-area" style={{ backgroundImage: coverImage ? `url(${coverImage})` : 'none' }}>
                            {!coverImage ? (
                                <div className="upload-placeholder">
                                    <Upload className="icon-large" />
                                    <p>انقر لرفع صورة الغلاف أو اسحب الصورة هنا</p>
                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'cover')} />
                                </div>
                            ) : (
                                <div className="upload-overlay">
                                    <button className="btn-remove" onClick={() => setCoverImage(null)}><Trash2 size={16} /> إزالة</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="upload-box profile-upload-box">
                        <div className="upload-header">
                            <ImageIcon className="icon" />
                            <h3>الصورة الشخصية (Profile)</h3>
                            <span className="recommended">يُفضل مقاس 400×400 كحد أدنى</span>
                        </div>
                        <div className="upload-area circle-preview" style={{ backgroundImage: profileImage ? `url(${profileImage})` : 'none' }}>
                            {!profileImage ? (
                                <div className="upload-placeholder">
                                    <Upload className="icon-large" />
                                    <p>اختر الصورة الشخصية</p>
                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'profile')} />
                                </div>
                            ) : (
                                <div className="upload-overlay">
                                    <button className="btn-remove" onClick={() => setProfileImage(null)}><Trash2 size={16} /> إزالة</button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Platform Previews Section */}
                <section className="platforms-section">
                    <div className="section-title">
                        <h2>المعاينات والتحكم</h2>
                        <p>شاهد كيف ستبدو هويتك في كل منصة وحمل الصور بالمقاس الدقيق.</p>
                    </div>

                    <div className="platforms-grid">
                        {PLATFORMS.map(platform => {
                            const Icon = platform.icon;
                            return (
                                <div className="platform-card" key={platform.id} style={{ '--brand-color': platform.color } as React.CSSProperties}>
                                    <div className="platform-header">
                                        <div className="title-area">
                                            <div className="platform-icon" style={{ background: platform.color }}>
                                                <Icon size={20} color="#fff" />
                                            </div>
                                            <h3>{platform.name}</h3>
                                        </div>
                                        <p className="platform-desc">{platform.description}</p>
                                    </div>

                                    <div className="visual-preview">
                                        <div className="preview-container">
                                            {/* Cover Preview */}
                                            {platform.coverSize ? (
                                                <div className="cover-preview" style={{ backgroundImage: coverImage ? `url(${coverImage})` : 'none' }}>
                                                    {!coverImage && <span className="empty-text">لا يوجد غلاف</span>}
                                                </div>
                                            ) : (
                                                <div className="cover-preview no-cover">
                                                    <span className="empty-text">لا يدعم الغلاف</span>
                                                </div>
                                            )}

                                            {/* Profile Preview */}
                                            <div className={`profile-preview ${platform.id}-profile`} style={{ backgroundImage: profileImage ? `url(${profileImage})` : 'none' }}>
                                                {!profileImage && <span className="empty-text">شخصية</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="download-actions">
                                        {platform.coverSize && (
                                            <button
                                                className={`action-btn cover-btn ${!coverImage ? 'disabled' : ''}`}
                                                disabled={!coverImage || isGenerating === `${platform.id}-cover.png`}
                                                onClick={() => coverImage && downloadImage(coverImage, platform.coverSize!.width, platform.coverSize!.height, `${platform.id}-cover.png`, platform.id)}
                                            >
                                                {isGenerating === `${platform.id}-cover.png` ? <span className="spinner"></span> : <Download size={16} />}
                                                تحميل الغلاف ({platform.coverSize.width}×{platform.coverSize.height})
                                            </button>
                                        )}
                                        <button
                                            className={`action-btn profile-btn ${!profileImage ? 'disabled' : ''}`}
                                            disabled={!profileImage || isGenerating === `${platform.id}-profile.png`}
                                            onClick={() => profileImage && downloadImage(profileImage, platform.profileSize.width, platform.profileSize.height, `${platform.id}-profile.png`, platform.id)}
                                        >
                                            {isGenerating === `${platform.id}-profile.png` ? <span className="spinner"></span> : <Download size={16} />}
                                            تحميل الشخصية ({platform.profileSize.width}×{platform.profileSize.height})
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
};
