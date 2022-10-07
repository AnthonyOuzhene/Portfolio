<template>

        <article class="article">
        <a href="#">
            <img class="fit-picture">

            <div class="title">
                <h1>Hello</h1>
            </div>

            <div class="category">
                <ul>
                    <li>Tech</li>
                    <li>Work</li>
                    <li>Front</li>
                    <li>Back</li>
                </ul>
            </div>

            <p class="content">
                Bla bla
            </p>

            <!-- <button class="btn">Voir plus<i class="fa fa-arrow-right"></i></button> -->
        </a>
    </article>

</template>

<script>

export default {
    data() {
        return {
            postData: {
                title: {
                    rendered: "",
                }
            }
        }
    }
}
</script>