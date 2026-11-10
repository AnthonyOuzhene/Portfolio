<script setup>
defineProps({
  skills: { type: Array, required: true },
});

const numbers = ['01', '02', '03', '04', '05', '06'];
</script>

<template>
  <section id="competences" class="section skills-section">
    <div class="container">
      <header class="section-head">
        <span v-reveal class="eyebrow">Compétences</span>
        <h2 v-reveal="80" class="section-title">Ma boîte à outils</h2>
        <p v-reveal="160" class="section-lead">
          Les technologies que j'utilise au quotidien pour passer d'une idée à une application en production.
        </p>
      </header>

      <div class="bento">
        <article
          v-for="(group, i) in skills"
          :key="group.id"
          v-reveal="i * 90"
          class="bento__cell card"
          :class="`bento__cell--${group.id}`"
        >
          <div class="bento__head">
            <span class="bento__num">{{ numbers[i] }}</span>
            <h3>{{ group.title }}</h3>
          </div>
          <p class="bento__desc">{{ group.description }}</p>
          <ul class="bento__items">
            <li v-for="item in group.items" :key="item" class="tag">{{ item }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bento {
  display: grid;
  gap: 16px;
}

.bento__cell {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: clamp(24px, 3vw, 36px);
  overflow: hidden;
  isolation: isolate;
  transition:
    border-color 0.4s,
    transform 0.4s var(--ease-out);
}

.bento__cell::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s;
  background: radial-gradient(600px circle at 0% 0%, rgb(139 92 255 / 0.14), transparent 50%);
}

.bento__cell:hover {
  border-color: var(--border-strong);
}

.bento__cell:hover::before {
  opacity: 1;
}

.bento__cell--backend {
  background:
    radial-gradient(circle at 100% 0%, rgb(255 77 90 / 0.18), transparent 55%),
    var(--surface);
}

.bento__cell--frontend {
  background:
    radial-gradient(circle at 100% 100%, rgb(139 92 255 / 0.2), transparent 55%),
    var(--surface);
}

.bento__head {
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.bento__num {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--accent);
}

.bento__head h3 {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
}

.bento__desc {
  color: var(--muted);
}

.bento__items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
  padding-top: 12px;
}

.bento__cell--backend .tag,
.bento__cell--frontend .tag {
  font-size: 0.88rem;
  padding: 7px 14px;
  color: var(--text);
}

@media (min-width: 760px) {
  .bento {
    grid-template-columns: repeat(6, 1fr);
  }

  .bento__cell--backend,
  .bento__cell--frontend {
    grid-column: span 3;
    min-height: 320px;
  }

  .bento__cell--tools,
  .bento__cell--soft {
    grid-column: span 3;
  }
}

@media (min-width: 1100px) {
  .bento__cell--backend {
    grid-column: span 4;
  }

  .bento__cell--frontend {
    grid-column: span 2;
  }

  .bento__cell--tools {
    grid-column: span 2;
  }

  .bento__cell--soft {
    grid-column: span 4;
  }
}
</style>
