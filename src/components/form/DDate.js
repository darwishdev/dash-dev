import {QBtn, QDate, QIcon, QInput, QPopupProxy} from 'quasar';
import {h, Ref, ref} from 'vue';


export default {
  name: 'DDate',

  props: {
    modelValue: String,
    inputProps: Object,
    pickerProps: Object,

    isRequired: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: 'scale',
    },
    closeOnContentClick: {
      type: Boolean,
      default: true,
    },
    isIcon: {
      type: Boolean,
      default: false,
    }

  },
  setup(props, {slots, emit}) {
    const menu = ref(false);
    const rangeRef = ref('');
    const requiredRule =
        (v) => {
          return !props.isRequired ? true :
                                     (v != void 0 && v != '' && v != null &&
                                      /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v)) ||
                  'Required_date'
        }
    // const isValid =  computed(() =>  false)
    const errorMessage = props.isRequired.toString()
    return () => h(
               QInput, {
                 ...props.inputProps,
                 modelValue: props.pickerProps.range ? rangeRef :
                                                       props.modelValue,
                 readonly: props.pickerProps.range,
                 rules: [requiredRule],
                 onClick: () => props.pickerProps.range ? menu.value = !menu.value :  null ,
                 mask: props.pickerProps.range ? '' : 'date',
                 'onUpdate:modelValue': (value) => {
                   if (!props.pickerProps.range)
                     emit('update:modelValue', value)
                   // console.log(...props.pickerProps)
                 }
               },
               {
                 append: () => h(
                     QIcon, {name: 'event', class: 'cursor-pointer'},
                     [h(QPopupProxy, {
                       cover: true,
                       modelValue: menu.value,
                       'onUpdate:modelValue': (value) => {menu.value = value},
                       transitionShow: props.transition,
                       transitionHide: props.transition
                     },
                        [h(QDate, {
                          // range: props.pickerProps.range,
                          modelValue: props.modelValue,
                          ...props.pickerProps,
                          'onUpdate:modelValue': (value) => {
                            emit('update:modelValue', value)

                            if (props.pickerProps.range) rangeRef.value =
                                `${value.from} : ${value.to}`
                            if (props.closeOnContentClick) menu.value = false
                          }
                        },
                           [!props.closeOnContentClick ?
                                h('div', {
                                  class: 'row items-center justify-end q-gutter-sm'
                                },
                                  [
                                    h(
                                        QBtn,
                                        {
                                          label: 'Close',
                                          flat: true,
                                          onClick: () => menu.value = false
                                        },
                                        ),
                                  ]) :
                                void 0])])])
               })
  },
};
