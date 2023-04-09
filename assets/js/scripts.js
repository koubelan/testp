/*
  Titre      : Projet Final - réalisation d'une boussole à partir des données du capteur GY-521 et affichage web
  Auteur     : KOUBELAN RICHARD AKPAGNI
  Date       : 06/04/2023
  Description: Partie CSS de notre page d'affichage Web de données du GY-561 
  Version    : 2.3.3
*/


// Fonction de recupération des données json à partir de l'addresse de l'ESP32
function updateData() {
  const esp32Address = 'http://10.0.0.150'; // Utilisez l'adresse IP de votre ESP32
  fetch(esp32Address + '/data.json')
    .then(response => response.json())
    .then(data => {

      // Met à jour les éléments HTML avec les données d'inclinaison
      document.getElementById('inclinaison-x').innerText = data['inclinaison-x'];
      document.getElementById('inclinaison-y').innerText = data['inclinaison-y'];
      document.getElementById('inclinaison-z').innerText = data['inclinaison-z'];
      document.getElementById('orientation').innerText = data['orientation'];

      // Met à jour les éléments HTML avec la donnée d'orientation
      const needle = document.getElementById('needle');
      needle.style.transform = `rotate(${data['orientation']}deg)`;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données JSON:', error);
    });
}

// Fonction de recupération de la mise à jour de l'arrière plan à partir de la donnée json produit par l'ESP
async function updateBodyBackgroundColor() {
  const esp32Address = 'http://10.0.0.150'; // Utilisez l'adresse IP de votre ESP32
  fetch(esp32Address + '/color')
  .then(response => response.json())
    .then(data => {
    // Mettez à jour les éléments HTML avec les données d'inclinaison
    document.body.style.backgroundColor = data.color;
  })
}

//Appelle de la fonction de la mise à jour de l'arrière plan de la page web 
updateBodyBackgroundColor();

// Met à jour les données toutes les 3 secondes de la page web  
setInterval(updateData, 3000);
