import DDate from './components/form/DDate'
import DForm from './components/form/DForm'


const version = __UI_VERSION__

function install(app) {
  app.component(DForm.name, DForm)
  app.component(DDate.name, DDate)
}

export {
  version,
  DForm,
  DDate,

  install
}
