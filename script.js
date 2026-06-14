 document.addEventListener("DOMContentLoaded", () => {
 // 1. Menu Mobile Réactif (Toggle Hambourg)
    const menuToggle = document.querySelector("#mobile-menu");
    const navMenu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("is-active");
        
        // Animation du menu burger
        const bars = document.querySelectorAll(".bar");
        bars[0].classList.toggle("toggle-bar1");
        bars[1].classList.toggle("toggle-bar2");
        bars[2].classList.toggle("toggle-bar3");
    });
    // Fermer le menu lors du clic sur un lien (Pratique pour le Single Page)
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });

    // --- 2. LOGIQUE DU CARROUSEL (LES 7 IMAGES SOUS 2025) ---
    const imagesDuCarrousel = document.querySelectorAll(".about-slider .about-slide");
    let indexImageCourante = 0;
    const delaiDefilement = 3000; // Changement toutes les 3 secondes (3000ms)

    function faireDefilerImage() {
        // Si le sélecteur n'a pas trouvé d'images, on arrête la fonction
        if (imagesDuCarrousel.length === 0) return;

        // 1. Enlever la classe active de l'image actuellement visible
        imagesDuCarrousel[indexImageCourante].classList.remove("active");

        // 2. Calculer l'index de la prochaine image (va de 0 à 6, puis retourne à 0)
        indexImageCourante = (indexImageCourante + 1) % imagesDuCarrousel.length;

        // 3. Ajouter la classe active sur la nouvelle image pour faire le fondu CSS
        imagesDuCarrousel[indexImageCourante].classList.add("active");
    }

    // Lancement du défilement automatique s'il y a bien des images trouvées
    if (imagesDuCarrousel.length > 0) {
        setInterval(faireDefilerImage, delaiDefilement);
    }


    // --- 3. Redirection vers le WhatsApp de l'ONGD ---
    const formulaireContact = document.querySelector("#ongd-form");

    if (formulaireContact) {
        formulaireContact.addEventListener("submit", (e) => {
            e.preventDefault(); // Stoppe le rechargement de page
            
            // Récupération des informations saisies
            const nom = document.querySelector("#name").value;
            const email = document.querySelector("#email").value;
            const sujet = document.querySelector("#subject").value;
            const message = document.querySelector("#message").value;

            // Numéro WhatsApp de l'organisation au format international (Exemple : 243992066004)
            const telephoneWhatsApp = "243992066004"; 

            // Formater le texte final pour WhatsApp
            const messageFormate = `Bonjour Mastodontes !%0A%0A` +
                                   `*Nouveau contact du site web*%0A` +
                                   `• *Nom :* ${encodeURIComponent(nom)}%0A` +
                                   `• *Email :* ${encodeURIComponent(email)}%0A` +
                                   `• *Sujet :* ${encodeURIComponent(sujet)}%0A` +
                                   `• *Message :* ${encodeURIComponent(message)}`;

            // Générer l'URL et ouvrir l'onglet WhatsApp
            const lienWhatsApp = `https://wa.me/${telephoneWhatsApp}?text=${messageFormate}`;
            window.open(lienWhatsApp, '_blank');

            // Vider les champs après envoi
            formulaireContact.reset();
        });
    }
});