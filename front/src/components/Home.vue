<template>
        <div class="home">

            <h1>Qui suis-je ?</h1>

            <img class="profile_pic" src="../assets/images/profile.png">

            <div class="description">

                
        <span class="z-index">Présentation</span>


                <ul class="infos">
                    <li><span>nom</span> : Ouzhene Anthony</li>
                    <li><span>job</span> : Développeur web</li>
                    <li><span>âge</span> : 38 ans</li>
                    <li><span>ville</span> : 76790 Gerville</li>

                </ul>
                <div class="anthony">
                    <p>
                        Bonjour ! Je m'appelle Anthony Ouzhene, développeur web fullstack junior avec une grande soif
                        d'apprendre, afin d'élargir mes connaissances.
                        Soucieux de produire du code de qualité, pensé Mobile First, j'attache une grande importance à
                        l'expérience utilisateur dans la conception des projets.
                    </p>
                    <p>
                        Plutôt orienté back-end, j'apprécie également le coté touche-à-tout que procure l'approche Full-stack.
                    </p>
                    <p>
                        Mon parcours professionnel m'a permis de découvrir divers univers tels que la logistique,
                        l'industrie
                        mais aussi le web avec mes compétences en rédaction SEO.
                    </p>
                    <p>
                        Vous trouverez ici une vitrine de mes travaux réalisés.
                        Vous pouvez également découvrir mon CV pour prendre connaissance de mon parcours et me
                        contacter si
                        vous le souhaitez.
                    </p>
                    <p>
                        Bonne navigation !
                    </p>
                </div>

                <div>
                    <a href="https://www.canva.com/design/DAE68W4gsrM/DPfaTZTt9n7Wbdf4n4bb2w/view?utm_content=DAE68W4gsrM&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" target="bla">
                        <button class="cv" type=button>
                            <i class="fa-solid fa-download"></i>
                            C'est par ici
                            </button>
                            </a>
                </div>

            </div>
            
        </div>
</template>

<script>

// Dépendance jspdf pour télécharger nouveau document vierge au format pdf
//import jsPDF from 'jspdf';

// TODO : 
// POUVOIR TELECHARGER SUR MANIGATEUR MON PDF 

export default {
    data() {
        return{
            
        }
    },
    methods:{
       // downloadPDF() {
        //    const pdf = new jsPDF();
   //pdf.save('CV ouzhene Anthony');
     //   }
    }
}
</script>

<style lang="scss" scoped>

</style>