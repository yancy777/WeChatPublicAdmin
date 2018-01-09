<template>
<div>

    <!-- Main table element -->
    <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-button>
              <b-btn :disabled="!filter" @click="">Clear</b-btn>
            </b-input-group-button>
<b-table show-empty
             stacked="md"
             :items="items"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             @filtered="onFiltered"
    >
     
     
    </b-table>
</div>
    <!-- User Interface controls -->
  
     
</template>

<script>
const items = [
  { isActive: true, age: 40, name:"nihao" },
  { isActive: false, age: 21, name: "shenme"},
 
  { isActive: false, age: 89, name: "shenme" },
  { isActive: true, age: 38, name: "shenme" },
  { isActive: false, age: 27, name: "kengdie"},
  { isActive: true, age: 40, name: "shenme"},
 
  { isActive: false, age: 26, name:"shenme" },
  { isActive: false, age: 22, name: "shenme" },
  { isActive: true, age: 38, name: "shenme" },
  { isActive: false, age: 29, name: "woca" }
]

export default {
  data () {
    return {
      items: items,
      fields:
             {
					name: { label: 'Person Full name'},
					age: { label: 'Person age'},
					actions: {  label: 'Actions' },
				},
    //    [
    //     { key: 'name', label: 'Person Full name', sortable: true },
    //     { key: 'age', label: 'Person age', sortable: true, 'class': 'text-center' },
    //     { key: 'isActive', label: 'is Active' },
    //     { key: 'actions', label: 'Actions' }
    //   ],
      currentPage: 1,
      perPage: 5,
      sortBy: null,
      sortDesc: false,
      filter: null,
      modalInfo: { title: '', content: '' }
    }
  },
 
  methods: {
 
  }
}
</script>

<!-- table-complete-1.vue -->