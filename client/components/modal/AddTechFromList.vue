<template>
  <div>
    <b-modal 
    id="add-modal" 
    size="lg" 
    centered 
    title="Available Technicians"
    ok-title="Save Changes">
      <div class="d-block text-center">
        <v-client-table :data="data" :columns="columns" :options="options"> 
          <input slot="selected" slot-scope="{row}" type="checkbox" :checked="row.selected" v-model="checkedRows" :value="row">
        </v-client-table>
      </div>
      
    </b-modal>
  </div>
</template>
<script>
export default {
  data(){
            return {
                  columns: [
                  'selected',
                  'first_name',
                  'last_name',
                  'phone_number',
                  'actions'
                  ],
                data: [],
                checkedRows:[],
                options: {
                  headings: {
                    // _id: {columnsDisplay: true},
                    first_name: 'First Name',
                    last_name: 'Last Name',
                    phone_number: 'Phone Number',
                    actions: 'Actions'
                  },
                  filterable: false,
              },
            }   
        },
  mounted() {
    this.data = this.availTechnicians
  },
  methods: {
    hideModal() {
        // this.$refs['my-modal'].hide()
      },
  },
}
</script>


<style scope>
.modal .modal-dialog .modal-content {
    border-color: #1b2025;
    box-shadow: none;
    background-color: #27313a;
}
.modal-header {
   
    border-bottom: 1px solid #2c353e;
}
.modal-footer {

    border-top: 1px solid #2c353e;
}
</style>