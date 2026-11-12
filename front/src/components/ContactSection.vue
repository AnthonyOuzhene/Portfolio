<script setup>
import { reactive, ref } from 'vue';
import { sendContact } from '../api.js';
import AppIcon from './AppIcon.vue';

const form = reactive({ name: '', email: '', message: '', website: '' });
const errors = ref({});
const status = ref('idle'); // idle | sending | sent | error
const serverError = ref('');

function validate() {
  const e = {};
  if (form.name.trim().length < 2) e.name = 'Votre nom est un peu court.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Adresse e-mail invalide.';
  if (form.message.trim().length < 10) e.message = 'Votre message doit faire au moins 10 caractères.';
  errors.value = e;
  return Object.keys(e).length === 0;
}

async function submit() {
  if (status.value === 'sending' || !validate()) return;
  status.value = 'sending';
  serverError.value = '';
  try {
    await sendContact({ ...form });
    status.value = 'sent';
    Object.assign(form, { name: '', email: '', message: '', website: '' });
  } catch (error) {
    status.value = 'error';
    errors.value = error.body?.fields ?? {};
    serverError.value = error.message;
  }
}
</script>

<template>
  <section id="contact" class="section contact">
    <div class="contact__glow" aria-hidden="true" />
    <div class="container contact__inner">
      <div class="contact__intro">
        <span v-reveal class="eyebrow">Contact</span>
        <h2 v-reveal="80" class="contact__title">
          Un projet ?<br />
          <span class="gradient-text">Parlons-en.</span>
        </h2>
        <p v-reveal="160" class="section-lead">
          Une opportunité, une question ou simplement envie d'échanger : écrivez-moi, je réponds rapidement.
        </p>
      </div>

      <form v-reveal="120" class="form card" novalidate @submit.prevent="submit">
        <Transition name="fade" mode="out-in">
          <div v-if="status === 'sent'" key="sent" class="form__success" role="status">
            <span class="form__success-icon"><AppIcon name="check" /></span>
            <h3>Message envoyé !</h3>
            <p>Merci pour votre message, je reviens vers vous très vite.</p>
            <button type="button" class="btn btn--ghost" @click="status = 'idle'">Envoyer un autre message</button>
          </div>

          <div v-else key="form" class="form__fields">
            <div class="field" :class="{ 'has-error': errors.name }">
              <label for="contact-name">Nom</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                name="name"
                autocomplete="name"
                placeholder="Ada Lovelace"
                :aria-invalid="!!errors.name"
                aria-describedby="contact-name-error"
              />
              <p id="contact-name-error" class="field__error">{{ errors.name }}</p>
            </div>

            <div class="field" :class="{ 'has-error': errors.email }">
              <label for="contact-email">E-mail</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="ada@exemple.fr"
                :aria-invalid="!!errors.email"
                aria-describedby="contact-email-error"
              />
              <p id="contact-email-error" class="field__error">{{ errors.email }}</p>
            </div>

            <div class="field" :class="{ 'has-error': errors.message }">
              <label for="contact-message">Message</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                name="message"
                rows="5"
                placeholder="Bonjour Anthony, …"
                :aria-invalid="!!errors.message"
                aria-describedby="contact-message-error"
              />
              <p id="contact-message-error" class="field__error">{{ errors.message }}</p>
            </div>

            <!-- Honeypot: hidden from humans, tempting for bots. -->
            <div class="sr-only" aria-hidden="true">
              <label for="contact-website">Site web</label>
              <input id="contact-website" v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" />
            </div>

            <p v-if="status === 'error' && serverError" class="form__server-error" role="alert">{{ serverError }}</p>

            <button type="submit" class="btn form__submit" :disabled="status === 'sending'">
              {{ status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message' }}
              <AppIcon v-if="status !== 'sending'" name="arrow-right" />
            </button>
          </div>
        </Transition>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact {
  overflow: hidden;
  isolation: isolate;
}

.contact__glow {
  position: absolute;
  z-index: -1;
  left: 50%;
  bottom: -40%;
  width: 90vmax;
  height: 60vmax;
  transform: translateX(-50%);
  background: radial-gradient(closest-side, rgb(139 92 255 / 0.25), rgb(255 77 90 / 0.1) 50%, transparent);
  filter: blur(40px);
}

.contact__inner {
  display: grid;
  gap: clamp(48px, 6vw, 80px);
}

.contact__intro {
  display: grid;
  gap: 20px;
  align-content: start;
}

.contact__title {
  font-size: clamp(3rem, 8vw, 6rem);
  letter-spacing: -0.045em;
  line-height: 0.95;
}

/* ---------- Form ---------- */
.form {
  padding: clamp(24px, 4vw, 40px);
  background: var(--panel);
  backdrop-filter: blur(16px);
}

.form__fields {
  display: grid;
  gap: 18px;
}

.field {
  display: grid;
  gap: 8px;
}

.field label {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--muted);
}

.field input,
.field textarea {
  width: 100%;
  padding: 14px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--field);
  font-size: 1rem;
  transition:
    border-color 0.2s,
    background 0.2s,
    box-shadow 0.2s;
}

.field textarea {
  resize: vertical;
  min-height: 140px;
}

.field input::placeholder,
.field textarea::placeholder {
  color: var(--faint);
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--accent-2);
  background: var(--field-focus);
  box-shadow: 0 0 0 4px rgb(139 92 255 / 0.18);
}

.has-error input,
.has-error textarea {
  border-color: var(--danger);
}

.field__error {
  min-height: 1.2em;
  font-size: 0.82rem;
  color: var(--danger);
}

.field__error:empty {
  display: none;
}

.form__server-error {
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  background: rgb(255 107 107 / 0.1);
  border: 1px solid rgb(255 107 107 / 0.3);
  color: var(--danger);
  font-size: 0.92rem;
}

.form__submit {
  width: 100%;
  margin-top: 6px;
}

.form__submit:disabled {
  opacity: 0.6;
  cursor: progress;
  transform: none;
}

.form__success {
  display: grid;
  justify-items: center;
  gap: 14px;
  padding-block: 40px;
  text-align: center;
}

.form__success-icon {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgb(61 214 140 / 0.12);
  color: var(--success);
  font-size: 1.6rem;
}

.form__success h3 {
  font-size: 1.8rem;
}

.form__success p {
  color: var(--muted);
  margin-bottom: 8px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 960px) {
  .contact__inner {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }

  /* Form on the left, text on the right (on mobile the text stays above the form). */
  .form {
    order: -1;
  }
}
</style>
