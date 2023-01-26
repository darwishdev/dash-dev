import {QBtn, QCheckbox, QDate, QForm, QInput, QOptionGroup, QRadio, QRange, QSelect, QSlider, QToggle} from 'quasar';
import {h, onBeforeMount, ref} from 'vue'
import DDate from './DDate';
export default {
  name: 'DForm',
  props: {
    default: Object,
    inputs: Array,
    submitCallback: Function,
    modelValue: {
      type: Object ,
      default: () => ({}),
    },
    url: String,
    method: String,
  },
  emits: ['update', 'onSubmit' , 'update:modelValue'],

  setup(props, {slots, emit}) {
    const inputsComponents = {
      QInput: QInput,
      QSelect: QSelect,
      QBtn: QBtn,
      QRange: QRange,
      QDate: QDate,
      QRadio: QRadio,
      DDate: DDate,
      QCheckbox: QCheckbox,
      QOptionGroup: QOptionGroup,
      QSlider: QSlider,
      QToggle: QToggle,
    };

    // const state = reactive({});
    const rootRef = ref(null);
    const loading = ref(false);
    onBeforeMount(() => {
      props.default.class += ' MForm';
      props.inputs.forEach((input) => {
        if(input.initialValue) props.modelValue[input.default.name] = input.initialValue
        if (typeof input.getData == 'function') {
          input.default.loading = true
          input.getData().then((res) => {
             input.default.options = res
             input.default.loading = false
            }).catch((err) => {
              console.log(err)
              input.default.loading = false

          })
        }
      });
    });

    function genereateInputs() {
      return props.inputs.map((input) => {
        return h('div', {class: `MForm__input ${input.cols}`}, [
          slots[`before-input-${input.default.name}`] != void 0 ?
              slots[`before-input-${input.default.name}`]() :
              null,
          slots[`input-${input.default.name}`] == void 0 ?
              h(inputsComponents[input.component], {
                ...input.default,
                modelValue: props.modelValue[input.default.name],
                'onUpdate:modelValue': (value) =>{
                  props.modelValue[input.default.name] = value
                 
                  emit('update:modelValue', props.modelValue)
                }
              }) :
              slots[`input-${input.default.name}`](),
          slots[`after-input-${input.default.name}`] != void 0 ?
              slots[`after-input-${input.default.name}`]() :
              null,
        ])
      });
    }

    function reset() {
      props.inputs.forEach((input) => (props.modelValue[input.default.name] = null));
      // rootRef.value!.resetValidation();
    }
    function submit() {
      emit('onSubmit');
    }
    return () => loading.value ? h('div', {innerHTML: 'Loading...'}) :
                                 h(QForm, {
                                   ...props.default,
                                   autofocus: true,
                                   ref: rootRef,
                                   onreset: reset,
                                   submit: submit
                                 },
                                   genereateInputs());
  }
}
