<script setup>
import { page } from '~/data/general'

const { companyInfo } = useAppConfig()

const securityItems = [
  {
    icon: 'i-lucide-shield-check',
    title: 'Bezpieczeństwo',
    description: 'Twoje dane są szyfrowane i&nbsp;bezpieczne.'
  },
  {
    icon: 'i-lucide-lock',
    title: 'Prywatność',
    description: 'Nie udostępniamy danych osobom trzecim.'
  },
  {
    icon: 'i-lucide-eye',
    title: 'Transparentność',
    description: 'Zawsze masz wgląd w&nbsp;swoje dane.'
  }
]

if (page?.seo) {
  usePageSpecificSeoMeta(page.seo)
}

const sections = [
  {
    title: '1. Administrator Danych',
    description: `Administratorem Twoich danych osobowych jest firma <strong>${companyInfo.companyName}</strong> z&nbsp;siedzibą ${companyInfo.zSiedziba},
      ${companyInfo.fullAddress}. W sprawach związanych z&nbsp;ochroną danych możesz skontaktować się pod&nbsp;adresem e-mail:
    <a
      :to="mailto:${companyInfo.email}"
      class="text-primary-500 underline hover:text-primary-600 transition-colors"
    >
      ${companyInfo.email}
    </a>.`
  },
  {
    title: '2. Cel i Podstawa Przetwarzania',
    description: 'Dane przetwarzane są w celu:',
    items: [
      'Odpowiedzi na zapytania przesłane przez formularz kontaktowy (art. 6 ust. 1 lit. f RODO).',
      'Realizacji zamówienia na świadectwo energetyczne lub audyt (art. 6 ust. 1 lit. b RODO).',
      'Wypełnienia obowiązków prawnych ciążących na Administratorze (art. 6 ust. 1 lit. c RODO).'
    ]
  },
  {
    title: '3. Okres Przechowywania Danych',
    description: 'Twoje dane będą przechowywane przez okres niezbędny do&nbsp;realizacji celu, dla&nbsp;którego zostały zebrane, a po jego zakończeniu przez czas wymagany przepisami prawa lub do&nbsp;momentu wycofania zgody.'
  },
  {
    title: '4. Twoje Prawa',
    description: 'W związku z RODO przysługuje Ci prawo do:',
    items: [
      'Dostępu do swoich danych oraz otrzymania ich kopii.',
      'Sprostowania (poprawiania) swoich danych.',
      'Usunięcia danych ("prawo do bycia zapomnianym").',
      'Ograniczenia przetwarzania danych.',
      'Wniesienia sprzeciwu wobec przetwarzania.',
      'Wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.'
    ]
  },
  {
    title: '5. Pliki Cookies',
    description: 'Strona korzysta z&nbsp;plików cookies w&nbsp;celach statystycznych i&nbsp;funkcjonalnych. Możesz zarządzać ustawieniami cookies w swojej przeglądarce internetowej. Wyłączenie cookies może wpłynąć na&nbsp;funkcjonalność niektórych elementów strony.'
  }
]
</script>

<template>
  <div class="container mx-auto px-4 md:px-6 py-12 md:py-20 mt-8">
    <h1 class="text-3xl lg:text-4xl font-heading font-bold text-primary mb-12 text-center underline decoration-secondary-200">
      Polityka Prywatności i&nbsp;RODO
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <RodoSecurityItemCard
        v-for="item in securityItems"
        :key="item.title"
        v-bind="item"
      />
    </div>

    <div class="prose prose-slate dark:prose-invert max-w-none space-y-12 text-gray-600 dark:text-gray-400">
      <RodoSection
        v-for="(section, index) in sections"
        :key="`rodo-secttion-${index}`"
        v-bind="section"
      />
    </div>
  </div>
</template>
