/*!
 * @darwishdev/dash-dev v0.0.1
 * (c) 2023 ahmed darwish <a.darwish.dev@gmail.com>
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('quasar'), require('vue')) :
  typeof define === 'function' && define.amd ? define(['quasar', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.dashDev = factory(global.Quasar, global.Vue));
})(this, (function (quasar, vue) { 'use strict';

  var DDate = {
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
    setup: function setup(props, ref$1) {
      ref$1.slots;
      var emit = ref$1.emit;

      var menu = vue.ref(false);
      var rangeRef = vue.ref('');
      var requiredRule =
          function (v) {
            return !props.isRequired ? true :
                                       (v != void 0 && v != '' && v != null &&
                                        /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v)) ||
                    'Required_date'
          };
      // const isValid =  computed(() =>  false)
      props.isRequired.toString();
      return function () { return vue.h(
                 quasar.QInput, Object.assign({}, props.inputProps,
                   {modelValue: props.pickerProps.range ? rangeRef :
                                                         props.modelValue,
                   readonly: props.pickerProps.range,
                   rules: [requiredRule],
                   onClick: function () { return props.pickerProps.range ? menu.value = !menu.value :  null; } ,
                   mask: props.pickerProps.range ? '' : 'date',
                   'onUpdate:modelValue': function (value) {
                     if (!props.pickerProps.range)
                       { emit('update:modelValue', value); }
                     // console.log(...props.pickerProps)
                   }}),
                 {
                   append: function () { return vue.h(
                       quasar.QIcon, {name: 'event', class: 'cursor-pointer'},
                       [vue.h(quasar.QPopupProxy, {
                         cover: true,
                         modelValue: menu.value,
                         'onUpdate:modelValue': function (value) {menu.value = value;},
                         transitionShow: props.transition,
                         transitionHide: props.transition
                       },
                          [vue.h(quasar.QDate, Object.assign({}, {modelValue: props.modelValue},
                            props.pickerProps,
                            {'onUpdate:modelValue': function (value) {
                              emit('update:modelValue', value);

                              if (props.pickerProps.range) { rangeRef.value =
                                  (value.from) + " : " + (value.to); }
                              if (props.closeOnContentClick) { menu.value = false; }
                            }}),
                             [!props.closeOnContentClick ?
                                  vue.h('div', {
                                    class: 'row items-center justify-end q-gutter-sm'
                                  },
                                    [
                                      vue.h(
                                          quasar.QBtn,
                                          {
                                            label: 'Close',
                                            flat: true,
                                            onClick: function () { return menu.value = false; }
                                          }
                                          ) ]) :
                                  void 0])])]); }
                 }); }
    },
  };

  var DForm = {
    name: 'DForm',
    props: {
      default: Object,
      inputs: Array,
      submitCallback: Function,
      modelValue: {
        type: Object ,
        default: function () { return ({}); },
      },
      url: String,
      method: String,
    },
    emits: ['update', 'onSubmit' , 'update:modelValue'],

    setup: function setup(props, ref$1) {
      var slots = ref$1.slots;
      var emit = ref$1.emit;

      var inputsComponents = {
        QInput: quasar.QInput,
        QSelect: quasar.QSelect,
        QBtn: quasar.QBtn,
        QRange: quasar.QRange,
        QDate: quasar.QDate,
        QRadio: quasar.QRadio,
        DDate: DDate,
        QCheckbox: quasar.QCheckbox,
        QOptionGroup: quasar.QOptionGroup,
        QSlider: quasar.QSlider,
        QToggle: quasar.QToggle,
      };

      // const state = reactive({});
      var rootRef = vue.ref(null);
      var loading = vue.ref(false);
      vue.onBeforeMount(function () {
        props.default.class += ' MForm';
        props.inputs.forEach(function (input) {
          if(input.initialValue) { props.modelValue[input.default.name] = input.initialValue; }
          if (typeof input.getData == 'function') {
            input.default.loading = true;
            input.getData().then(function (res) {
               input.default.options = res;
               input.default.loading = false;
              }).catch(function (err) {
                console.log(err);
                input.default.loading = false;

            });
          }
        });
      });

      function genereateInputs() {
        return props.inputs.map(function (input) {
          return vue.h('div', {class: ("MForm__input " + (input.cols))}, [
            slots[("before-input-" + (input.default.name))] != void 0 ?
                slots[("before-input-" + (input.default.name))]() :
                null,
            slots[("input-" + (input.default.name))] == void 0 ?
                vue.h(inputsComponents[input.component], Object.assign({}, input.default,
                  {modelValue: props.modelValue[input.default.name],
                  'onUpdate:modelValue': function (value) {
                    props.modelValue[input.default.name] = value;
                   
                    emit('update:modelValue', props.modelValue);
                  }})) :
                slots[("input-" + (input.default.name))](),
            slots[("after-input-" + (input.default.name))] != void 0 ?
                slots[("after-input-" + (input.default.name))]() :
                null ])
        });
      }

      function reset() {
        props.inputs.forEach(function (input) { return (props.modelValue[input.default.name] = null); });
        // rootRef.value!.resetValidation();
      }
      function submit() {
        emit('onSubmit');
      }
      return function () { return loading.value ? vue.h('div', {innerHTML: 'Loading...'}) :
                                   vue.h(quasar.QForm, Object.assign({}, props.default,
                                     {ref: rootRef,
                                     onreset: reset,
                                     submit: submit}),
                                     genereateInputs()); };
    }
  };

  var DTable = {
    name: 'DTable',
    props: {
      default: Object,
      inputs: Array,
      submitCallback: Function,
      modelValue: {
        type: Object ,
        default: function () { return ({}); },
      },
      url: String,
      method: String,
    },
    emits: ['update', 'onSubmit' , 'update:modelValue'],

    setup: function setup(props, ref$1) {
      var slots = ref$1.slots;
      var emit = ref$1.emit;

      var inputsComponents = {
        QInput: quasar.QInput,
        QSelect: quasar.QSelect,
        QBtn: quasar.QBtn,
        QRange: quasar.QRange,
        QDate: quasar.QDate,
        QRadio: quasar.QRadio,
        QCheckbox: quasar.QCheckbox,
        QOptionGroup: quasar.QOptionGroup,
        QSlider: quasar.QSlider,
        QToggle: quasar.QToggle,
      };

      // const state = reactive({});
      var rootRef = vue.ref(null);
      var loading = vue.ref(false);
      vue.onBeforeMount(function () {
        props.default.class += ' MForm';
        props.inputs.forEach(function (input) {
          if(input.initialValue) { props.modelValue[input.default.name] = input.initialValue; }
          if (typeof input.getData == 'function') {
            input.default.loading = true;
            input.getData().then(function (res) {
               input.default.options = res;
               input.default.loading = false;
              }).catch(function (err) {
                console.log(err);
                input.default.loading = false;

            });
          }
        });
      });

      function genereateInputs() {
        return props.inputs.map(function (input) {
          return vue.h('div', {class: ("MForm__input " + (input.cols))}, [
            slots[("before-input-" + (input.default.name))] != void 0 ?
                slots[("before-input-" + (input.default.name))]() :
                null,
            slots[("input-" + (input.default.name))] == void 0 ?
                vue.h(inputsComponents[input.component], Object.assign({}, input.default,
                  {modelValue: props.modelValue[input.default.name],
                  'onUpdate:modelValue': function (value) {
                    props.modelValue[input.default.name] = value;
                   
                    emit('update:modelValue', props.modelValue);
                  }})) :
                slots[("input-" + (input.default.name))](),
            slots[("after-input-" + (input.default.name))] != void 0 ?
                slots[("after-input-" + (input.default.name))]() :
                null ])
        });
      }

      function reset() {
        props.inputs.forEach(function (input) { return (props.modelValue[input.default.name] = null); });
        // rootRef.value!.resetValidation();
      }
      function submit() {
        emit('onSubmit');
      }
      return function () { return loading.value ? vue.h('div', {innerHTML: 'Loading...'}) :
                                   vue.h(quasar.QForm, Object.assign({}, props.default,
                                     {autofocus: true,
                                     ref: rootRef,
                                     onreset: reset,
                                     submit: submit}),
                                     genereateInputs()); };
    }
  };

  //form


  var version = '0.0.1';

  function install(app) {
    app.component(DForm.name, DForm);
    app.component(DDate.name, DDate);
    app.component(DTable.name, DTable);
  }

  var VuePlugin = /*#__PURE__*/Object.freeze({
    __proto__: null,
    version: version,
    DForm: DForm,
    DDate: DDate,
    DTable: DTable,
    install: install
  });

  return VuePlugin;

}));
