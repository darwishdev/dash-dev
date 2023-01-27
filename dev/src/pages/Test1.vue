
<script setup >
import {  onBeforeMount, reactive, ref } from 'vue';
// import {api} from '../utils/http.js'

const loading = ref(true);
const formData = ref({
  name: 'Thor Odinson',
})
const simpleFormProps = reactive({
  default: {
    class: '',
  },
  inputs: [
    {
      default: {
        name: 'name',
        class: 'col-6',

        label: 'name',

      },
      initialValue: '',
      component: 'QInput',
    },
  ],
});

const formProps = reactive({
  default: {
    class: 'row  justify-center q-pa-md',
    autofocus: true,
  },
  inputs: [
    {
      default: {
        name: 'name',
        label: 'name',
      },
      cols: 'col-6',
      initialValue: '',
      component: 'QInput',
    },
    {
      default: {
        name: 'phone',
        rules : ['required'],

        label: 'phone',
      },
      cols: 'col-6',

      initialValue: 's',
      component: 'QInput',
    },
    {
      default: {
        name: 'checkbox',
        label: 'checkbox',

      },
      cols: 'col-6',
      initialValue: false,
      component: 'QCheckbox',
    },
    {
      default: {
        name: 'toggle',
        label: 'toggle',
      },
      cols: 'col-6',
      initialValue: false,
      component: 'QToggle',
    },
    {
      default: {
        name: 'slider',
        label: 'slider',
        min: 20,
        max: 80,
        step: 10,
      },
      cols: 'col-6',
      initialValue: false,
      component: 'QSlider',
    },
    {
      default: {
        name: 'group',
        label: 'group',
        options: [
          {
            label: 'Option 1',
            value: 'op1'
          },
          {
            label: 'Option 2',
            value: 'op2'
          },
          {
            label: 'Option 3',
            value: 'op3'
          }
        ],

      },
      initialValue: null,
      cols: 'col-6',
      component: 'QOptionGroup',
    },

    {
      default: {
        name: 'city2',
        label: 'city',
        optionLabel: 'name',
        options: [],
        autoComplete: true,

      },
      cols: 'col-6',
      // getData: () => {
      //   return new Promise((resolve, reject) => {
      //     api.post('ListUsers', { 'email': 'tssdsdestdoe', 'name': '12345' }).then((res) => {
      //       resolve(res.data.users)
      //     }).catch((err) => {
      //       reject(err)
      //     })
      //   })
      // },
      initialValue: '',
      component: 'QSelect',
    },

    {
      default: {
        name: 'dateRange',
        inputProps: {
          name: 'dateRange',
          label: 'dateRange',
          filled: true,
        },
        pickerProps: {
          range: true,

        },
      },
      cols: 'col-6',
      initialValue: '',
      component: 'DDate',
    },
    {
      default: {
        name: 'date',
        // closeOnContentClick: false,
        isRequired: true,
        inputProps: {
          name: 'date',
          label: 'date',
          filled: true,

        },
        pickerProps: {
          range: false,
        },
      },
      cols: 'col-6',
      initialValue: '',
      component: 'DDate',
    },


    {
      default: {
        label: 'Submit',
        class: 'full-width q-my-md',
        type: 'submit',
        color: 'primary',
      },
      cols: 'col-12',

      component: 'QBtn',
    },
    {
      default: {
        label: 'reset',
        class: 'full-width',
        type: 'reset',
        color: 'primary',
      },
      cols: 'col-12',

      component: 'QBtn',
    },
  ],
});




// function modelUpdated(data) {
//   innerModel.value = data
//   console.log('innerModel');
//   console.log(innerModel);
//   // console.log(data);
// }
function onFormSubmit() {
  console.log(formData.value);
}
onBeforeMount(() => {
  loading.value = false;
})
</script>


<template>
  <q-page padding>
   {{ formData }}
    <DForm v-model="formData" @on-submit="onFormSubmit" v-if="!loading" :default="formProps.default" :inputs="formProps.inputs" />
    <DTable v-model="formData" @on-submit="onFormSubmit" v-if="!loading" :default="formProps.default" :inputs="formProps.inputs" />


  </q-page>
</template>


