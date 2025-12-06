-- Seed Data

-- Categories
INSERT INTO categories (name, slug) VALUES
  ('Göz Sağlığı', 'goz-sagligi'),
  ('Tedaviler', 'tedaviler'),
  ('Haberler', 'haberler')
ON CONFLICT (slug) DO NOTHING;

-- Doctor Info
INSERT INTO doctor_info (name, title, specialty, bio, certifications, education, experience) VALUES
  (
    'Fatih Çakır Gündoğan',
    'Doç. Dr.',
    'Göz Hastalıkları Uzmanı',
    'Uluslararası ve Avrupa Yeterlilik Sertifikası sahibi, deneyimli göz hastalıkları uzmanı. Katarakt, göz çizdirme, akıllı lens ve göz tansiyonu tedavilerinde uzmanlaşmış.',
    ARRAY['Uluslararası Yeterlilik Sertifikası', 'Avrupa Yeterlilik Sertifikası'],
    ARRAY['Tıp Fakültesi Mezuniyeti', 'Göz Hastalıkları Uzmanlık Eğitimi', 'Doçentlik'],
    ARRAY['Katarakt Cerrahisi', 'Göz Çizdirme (Excimer Laser)', 'Akıllı Lens Uygulamaları', 'Göz Tansiyonu Tedavisi', 'Retina Hastalıkları']
  )
ON CONFLICT DO NOTHING;

-- Site Settings
INSERT INTO site_settings (
  site_title,
  site_description,
  phone,
  email,
  whatsapp,
  address,
  facebook_url,
  instagram_url,
  twitter_url,
  youtube_url,
  default_meta_title,
  default_meta_description,
  keywords
) VALUES (
  'Doç. Dr. Fatih Çakır Gündoğan',
  'Göz Hastalıkları Uzmanı - Kayseri',
  '+90 352 606 0598',
  'info@drfatihgundogan.com',
  '+90 352 606 0598',
  'Hunat Mah, Nuh Mehmet Baldöktü Sok, Özer Plaza, No: 3/18, Melikgazi, Kayseri',
  'https://facebook.com/doc.dr.fatih.c.gundogan',
  'https://instagram.com/doc.dr.fatih.c.gundogan',
  'https://twitter.com/docdrfcgundogan',
  'https://www.youtube.com/channel/UCqPGUc2cuwB4C8HMUbZvBqw',
  'Doç. Dr. Fatih Çakır Gündoğan - Göz Hastalıkları Uzmanı',
  'Kayseri''de göz hastalıkları tedavisi. Katarakt, göz çizdirme, akıllı lens, göz tansiyonu tedavileri.',
  ARRAY['göz doktoru', 'göz hastalıkları', 'katarakt', 'göz çizdirme', 'akıllı lens', 'kayseri']
)
ON CONFLICT DO NOTHING;

-- Treatments
INSERT INTO treatments (title, slug, description, content, order_index, meta_title, meta_description) VALUES
  (
    'Katarakt',
    'katarakt',
    'Katarakt, göz merceğinin bulanıklaşması sonucu görme kaybına neden olan bir göz hastalığıdır.',
    '<h2>Katarakt Nedir?</h2><p>Katarakt, göz merceğinin doğal şeffaflığını kaybederek bulanıklaşması durumudur. Bu durum genellikle yaşlanmayla birlikte ortaya çıkar ancak travma, ilaç kullanımı veya bazı hastalıklar nedeniyle de gelişebilir.</p><h2>Belirtileri</h2><ul><li>Bulanık görme</li><li>Işığa hassasiyet</li><li>Gece görüşünde zorluk</li><li>Renklerin soluk görünmesi</li></ul><h2>Tedavi</h2><p>Katarakt tedavisinde en etkili yöntem cerrahi müdahaledir. Modern katarakt cerrahisinde, bulanıklaşmış mercek çıkarılarak yerine yapay mercek (göz içi lens) yerleştirilir.</p>',
    1,
    'Katarakt Tedavisi - Doç. Dr. Fatih Çakır Gündoğan',
    'Kayseri''de katarakt ameliyatı ve tedavisi. Modern cerrahi yöntemlerle katarakt tedavisi.'
  ),
  (
    'Göz Çizdirme',
    'goz-cizdirme',
    'Excimer laser ile göz çizdirme, miyop, hipermetrop ve astigmat tedavisinde kullanılan modern bir yöntemdir.',
    '<h2>Göz Çizdirme (Excimer Laser) Nedir?</h2><p>Göz çizdirme, kornea tabakasının lazer ile şekillendirilmesi yoluyla kırma kusurlarının düzeltilmesi işlemidir. LASIK, PRK ve SMILE gibi farklı teknikler uygulanabilir.</p><h2>Kimler İçin Uygundur?</h2><ul><li>18 yaş üstü bireyler</li><li>Stabil numaraya sahip olanlar</li><li>Kornea kalınlığı yeterli olanlar</li><li>Genel sağlık durumu uygun olanlar</li></ul><h2>Avantajları</h2><p>Gözlük ve lens bağımlılığından kurtulma, hızlı iyileşme süreci ve yüksek başarı oranı göz çizdirme işleminin başlıca avantajlarıdır.</p>',
    2,
    'Göz Çizdirme (Excimer Laser) - Doç. Dr. Fatih Çakır Gündoğan',
    'Kayseri''de göz çizdirme işlemi. LASIK, PRK ve SMILE teknikleri ile miyop, hipermetrop ve astigmat tedavisi.'
  ),
  (
    'Akıllı Lens',
    'akilli-lens',
    'Akıllı lens, hem uzak hem yakın görme problemlerini tek bir lens ile çözen modern bir tedavi yöntemidir.',
    '<h2>Akıllı Lens Nedir?</h2><p>Akıllı lens (multifokal veya trifokal göz içi lens), göz içine yerleştirilen ve hem uzak hem yakın görmeyi sağlayan özel tasarlanmış lenslerdir.</p><h2>Avantajları</h2><ul><li>Gözlük bağımlılığını ortadan kaldırır</li><li>Hem uzak hem yakın net görüş sağlar</li><li>Kalıcı çözüm sunar</li><li>Katarakt oluşumunu engeller</li></ul><h2>Uygulama</h2><p>İşlem, katarakt ameliyatına benzer şekilde gerçekleştirilir. Doğal göz merceği çıkarılarak yerine akıllı lens yerleştirilir.</p>',
    3,
    'Akıllı Lens Tedavisi - Doç. Dr. Fatih Çakır Gündoğan',
    'Kayseri''de akıllı lens uygulaması. Multifokal ve trifokal lens ile gözlüksüz yaşam.'
  ),
  (
    'Göz Tansiyonu',
    'goz-tansiyonu',
    'Göz tansiyonu (glokom), göz içi basıncının artması sonucu görme sinirinin hasar görmesidir.',
    '<h2>Göz Tansiyonu (Glokom) Nedir?</h2><p>Glokom, göz içi sıvısının normal şekilde drene edilememesi sonucu göz içi basıncının artması ve görme sinirinin zarar görmesidir. Tedavi edilmezse kalıcı görme kaybına yol açabilir.</p><h2>Risk Faktörleri</h2><ul><li>40 yaş üstü olmak</li><li>Ailede glokom öyküsü</li><li>Miyop veya hipermetrop</li><li>Diyabet</li><li>Uzun süreli kortizon kullanımı</li></ul><h2>Tedavi Seçenekleri</h2><p>Göz tansiyonu tedavisinde ilaç tedavisi, lazer tedavisi ve cerrahi müdahale seçenekleri bulunmaktadır. Erken teşhis ve düzenli takip çok önemlidir.</p>',
    4,
    'Göz Tansiyonu (Glokom) Tedavisi - Doç. Dr. Fatih Çakır Gündoğan',
    'Kayseri''de göz tansiyonu tedavisi. Glokom tanı ve tedavi yöntemleri.'
  ),
  (
    'Gece Körlüğü',
    'gece-korlugu',
    'Gece körlüğü (tavuk karası), karanlık ortamlarda görme güçlüğü yaşanması durumudur.',
    '<h2>Gece Körlüğü Nedir?</h2><p>Gece körlüğü veya tavuk karası, düşük ışık koşullarında veya karanlıkta görme yeteneğinin azalması durumudur. Retina hücrelerinin işlev bozukluğu sonucu ortaya çıkar.</p><h2>Nedenleri</h2><ul><li>A vitamini eksikliği</li><li>Retinitis pigmentosa</li><li>Katarakt</li><li>Miyop</li><li>Diyabetik retinopati</li></ul><h2>Tedavi</h2><p>Tedavi, altta yatan nedene göre belirlenir. A vitamini takviyesi, gözlük kullanımı veya cerrahi müdahale gerekebilir.</p>',
    5,
    'Gece Körlüğü (Tavuk Karası) Tedavisi - Doç. Dr. Fatih Çakır Gündoğan',
    'Kayseri''de gece körlüğü tedavisi. Tavuk karası tanı ve tedavi yöntemleri.'
  )
ON CONFLICT (slug) DO NOTHING;
