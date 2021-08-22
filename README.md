# Olusturulma Amacı
Kodluyoruz Front-End eğitimi boyunca yapacağım denemeler kapsamında oluşturacağım dosyaların git ve github kullanımı konusunda da tecrübe edinmemi sağlaması maksadıyla oluşturdum.

## Calisma Yontemi
- *HTML*,*CSS*, *JAVASCRIPT* konuları boyunca yapılacak her yeni ornekte master branch'ten farklı olarak yeni bir branch oluşturulacak
- Ornek veya Odev sonralarında **nihai proje** kapsamına giren ve master'da olmasini gerekli gordugum branch'ler master ile merge edilecek

### Notlar
- branch ismi degistirme ve eskisini github uzerinden kaldirma  
git branch -m old_branch new_branch         // Rename branch locally    
git push origin :old_branch                 // Delete the old branch  
git push origin new_branch                  // Push new branch  
-  head branch icin isim degistirme sonrasi gerekli  
git branch -m master main   //isim degisti  
git fetch origin  
git branch -u origin/main main  
git remote set-head origin -a  

- Commit yazarken dikkat edilmesinde fayda var  

  - başlığı emir kipi ile yaz,
  - birden fazla kisi ile birlikte calisilmis ama tek kisi commitlemisse yardimci olanlari da eklemekte fayda var,  
```
Co-authored-by: Foo Bar <foo.bar@example.com>
Co-authored-by: John Bob <john.bob@example.com>
```