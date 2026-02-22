import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import router from './router'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
  locale: {
    emptyMessage: 'Nenhuma opção disponível',
    emptyFilterMessage: 'Nenhum resultado encontrado',
    emptySearchMessage: 'Nenhum resultado encontrado',
    emptySelectionMessage: 'Nenhum item selecionado',
    selectionMessage: '{0} itens selecionados',
    selectAll: 'Selecionar todos',
    unselectAll: 'Desmarcar todos',
    searchMessage: '{0} resultados disponíveis',
    filtersHidden: 'Filtros ocultos',
    filtersVisible: 'Filtros visíveis',

    choose: 'Escolher',
    upload: 'Enviar',
    cancel: 'Cancelar',
    close: 'Fechar',
    clear: 'Limpar',
    apply: 'Aplicar',

    firstPageLabel: 'Primeira Página',
    lastPageLabel: 'Última Página',
    nextPageLabel: 'Próxima Página',
    prevPageLabel: 'Página Anterior',
    rowsPerPageLabel: 'Linhas por página',
    jumpToPageDropdownLabel: 'Ir para página',
    jumpToPageInputLabel: 'Ir para página',
    currentPageReportTemplate: 'Exibindo {first} a {last} de {totalRecords}',
    pageLabel: 'Página {page}',

    sortAscending: 'Ordenar Crescente',
    sortDescending: 'Ordenar Decrescente',
    removeSort: 'Remover Ordenação',
    nullSortOrder: 'Sem ordenação',
    addRule: 'Adicionar Regra',
    removeRule: 'Remover Regra',
    matchAll: 'Corresponder Todos',
    matchAny: 'Corresponder Algum',
    contains: 'Contém',
    notContains: 'Não Contém',
    startsWith: 'Começa Com',
    endsWith: 'Termina Com',
    equals: 'Igual',
    notEquals: 'Diferente',
    before: 'Antes',
    after: 'Depois',
    dateFormat: 'dd/mm/yy',
    lt: 'Menor que',
    lte: 'Menor ou igual a',
    gt: 'Maior que',
    gte: 'Maior ou igual a',
    between: 'Entre',
    noFilter: 'Sem Filtro',
    filter: 'Filtrar',

    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    chooseYear: 'Escolher Ano',
    chooseMonth: 'Escolher Mês',
    chooseDate: 'Escolher Data',
    prevDecade: 'Década Anterior',
    nextDecade: 'Próxima Década',
    prevYear: 'Ano Anterior',
    nextYear: 'Próximo Ano',
    prevMonth: 'Mês Anterior',
    nextMonth: 'Próximo Mês',
    prevHour: 'Hora Anterior',
    nextHour: 'Próxima Hora',
    prevMinute: 'Minuto Anterior',
    nextMinute: 'Próximo Minuto',
    prevSecond: 'Segundo Anterior',
    nextSecond: 'Próximo Segundo',
    am: 'AM',
    pm: 'PM',
    today: 'Hoje',
    now: 'Agora',
    weekHeader: 'Sem',
    firstDayOfWeek: 0,

    invalidFileSizeMessage:
      '{0}: Tamanho de arquivo inválido, o arquivo deve ter no máximo {1}.',
    invalidFileTypeMessage: '{0}: Tipo de arquivo inválido.',
    invalidFileLimitMessage:
      'Número máximo de arquivos excedido. O limite é {0} no máximo.',

    loadingMessage: 'Carregando...',

    weak: 'Fraca',
    medium: 'Média',
    strong: 'Forte',
    passwordPrompt: 'Digite uma senha',
  },
})

app.use(ToastService)
app.use(ConfirmationService)

app.mount('#app')
