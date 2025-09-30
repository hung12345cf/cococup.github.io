// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Xử lý form mua hàng
    const muaHangForm = document.getElementById('form-mua-hang');
    if (muaHangForm) {
        muaHangForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(muaHangForm);
            const diaChi = formData.get('dia-chi').trim();
            const soDienThoai = formData.get('so-dien-thoai').trim();
            const email = formData.get('email').trim();
            const sanPham = formData.get('san-pham').trim();

            if (diaChi && soDienThoai && email && sanPham) {
                document.getElementById('modal-thong-bao').style.display = 'block';
                muaHangForm.reset();
            } else {
                alert('Vui lòng điền đầy đủ thông tin!');
            }
        });
    }

    // Xử lý form liên hệ
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            if (formData.get('name') && formData.get('email') && formData.get('message')) {
                document.getElementById('modal-thong-bao').style.display = 'block';
                contactForm.reset();
            } else {
                alert('Vui lòng điền đầy đủ!');
            }
        });
    }

    // Đóng modal
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            const modal = document.getElementById('modal-thong-bao');
            if (modal) modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        const modal = document.getElementById('modal-thong-bao');
        if (modal && e.target.classList.contains('modal')) {
            modal.style.display = 'none';
        }
    });

    // Xử lý thanh tìm kiếm
    const searchButton = document.querySelector('.search-bar button');
    const searchInput = document.querySelector('.search-bar input');
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', performSearch);
        
        // Optional: Add Enter key support
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        function performSearch() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                // Tìm tất cả product-item trên trang hiện tại
                const productItems = document.querySelectorAll('.product-item');
                let foundCount = 0;
                
                productItems.forEach((item) => {
                    const name = item.querySelector('h3')?.textContent.toLowerCase() || '';
                    const matches = name.includes(searchTerm);
                    
                    if (matches) {
                        item.style.display = 'block';
                        foundCount++;
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                searchInput.value = ''; // Clear the input
            } else {
                // Reset all items to visible if search term is empty
                const productItems = document.querySelectorAll('.product-item');
                productItems.forEach((item) => {
                    item.style.display = 'block';
                });
            }
        }
    } else {
        console.error('Search button or input not found in the DOM');
    }

    // Khởi tạo Google Maps
    const mapElement = document.getElementById('map');
    if (mapElement) {
        function initMap() {
            const location = { lat: 10.0124518, lng: 105.7324316 };
            const map = new google.maps.Map(mapElement, {
                center: location,
                zoom: 15,
            });
            new google.maps.Marker({
                position: location,
                map: map,
                title: 'Lá Dừa Eco - Trường Đại học FPT Cần Thơ',
            });
        }
        initMap(); // Call the function directly since the script is loaded after DOM
    }
});