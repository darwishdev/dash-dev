//form
import DDate from './components/form/DDate'
import DForm from './components/form/DForm'

//table
import DTable from './components/table/DTable'


const version = __UI_VERSION__

function install(app) {
  app.component(DForm.name, DForm)
  app.component(DDate.name, DDate)
  app.component(DTable.name, DTable)
}

export {
  version,
  DForm,
  DDate,
  DTable,
  install
}
