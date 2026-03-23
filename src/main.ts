import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import ToastService from 'primevue/toastservice'

import '@/assets/css/index.css'

import App from './App.vue'
import router from './router'

import AppLogo from './components/AppLogo.vue'
import BaseInput from './components/ui/input/BaseInput.vue'
import BaseButton from './components/ui/button/BaseButton.vue'
import BaseCard from './components/ui/card/BaseCard.vue'
import BaseSelect from './components/ui/select/BaseSelect.vue'
import BaseTable from './components/ui/table/BaseTable.vue'
import BaseTextareaField from './components/ui/textarea/BaseTextareaField.vue'
import BaseDatePicker from './components/ui/datepicker/BaseDatePicker.vue'

const app = createApp(App)

app.component('AppLogo', AppLogo)
app.component('BaseInput', BaseInput)
app.component('BaseButton', BaseButton)
app.component('BaseCard', BaseCard)
app.component('BaseSelect', BaseSelect)
app.component('BaseTable', BaseTable)
app.component('BaseTextareaField', BaseTextareaField)
app.component('BaseDatePicker', BaseDatePicker)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { unstyled: true })
app.use(ToastService)

app.directive('tooltip', Tooltip)

app.mount('#app')
