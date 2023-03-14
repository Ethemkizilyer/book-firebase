<template>
  <div class="home mt-6">
    <h2>Firebase</h2>
    <table class="table is-bordered" >
  <thead>
    <tr>
      <th>Book Name</th>
      <th>Author</th>
      <th>Page</th>
      <th>CRUD</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><input type="text" v-model="eren.name"></td>
      <td><input type="text" v-model="eren.author"></td>
      <td><input type="text" v-model="eren.pageCount"></td>
      <td><button @click="ethm">⌨</button></td>
    </tr>
    <tr  v-for="item in state.items" :key="item.id">
      <td  class="is-size-4 has-text-weight-bold">{{ item.name }}</td>
      <td class="is-size-5 has-text-weight-normal">{{ item.author }}</td>
      <td>{{ item.pageCount }}</td>
      <td>
        <button @click="nam(id=item.id,s='delete')">❌</button>
        <button @click="nam(item.id,s='update')">🛠</button>
      </td>
     
    </tr>
  </tbody>
</table>
<div v-if="nami" >
<div v-for="na in asd" :key="na.id">
<label  >Book Name</label>
<input type="text" v-model="na.name"><br>
<label  >Author</label>
<input type="text" v-model="na.author"><br>
<label  >Page Count</label>
<input type="text" v-model="na.pageCount">
<button @click="bakar(na)">KAYDET</button>
</div>
</div>
  </div>
</template>

<script>
import { onMounted,reactive,ref } from "vue";
import {
  getFirestore,
  collection,
  getDocs,
  get,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { fb } from "@/firebase/config";

export default {
  name: "HomeView",
  components: {},
  setup() {
      const state = reactive({
      items: []
    });
    const eren=ref({name:"",author:"",pageCount:""})

const ethm=()=>{
  const db = getFirestore(fb);
      const fbRef = collection(db, "books");
      addDoc(fbRef,{
      name:eren.value.name,
      author:eren.value.author,
      pageCount:eren.value.pageCount
      })
      fetchData()
}

    const nami = ref(false)
    const asd =ref([])
    const nam=(id=id,s)=>{ 
      asd.value= state.items.filter((item)=>item.id==id)
      if(s=="update"){
        nami.value=!nami.value
      }
      if (s=="delete") {
        const docRef=doc(db,'books',id)
      deleteDoc(docRef)
      fetchData()
      } 
      
      
    console.log(asd.value[0].name)
    }
    const db = getFirestore(fb);
    const bakar=(nav)=>{
      console.log(nav)
      const docRef = doc(db, "books", nav.id);
      updateDoc(docRef, { ...nav });
    }
       const fetchData = async () => {
      const db = getFirestore(fb);
      const fbRef = collection(db, "books");
      const fbDocs = await getDocs(fbRef);
      const data = fbDocs.docs.map((doc) => doc.data());
      const docID = fbDocs.docs.map((doc) => doc.id);
      const docdata = fbDocs.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(docdata);
      console.log(docID);
      console.log(data);
      state.items = docdata;
    };

    onMounted(async () => {
      const db = getFirestore(fb);
      const fbRef = collection(db, "books");
      const fbDocs = await getDocs(fbRef);
      const data = fbDocs.docs.map((doc) => doc.data());
      const docID = fbDocs.docs.map((doc) => doc.id);
      const docdata = fbDocs.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(docdata);
      console.log(docID);
      console.log(data);
      state.items = docdata;

      //****** VERİ EKLEME *****/
      // addDoc(fbRef,{
      //   name:"Sokrates'in Savunması",
      //   author:"Platon",
      //   pageCount:200
      // })

      //****** VERİ SİLME  ****/
      // const docRef=doc(db,'books',"LayFbbqhIBQ7aftRm9pB")
      // deleteDoc(docRef)

      //****** VERİ FİLTRELEME  ****/
      const q = query(fbRef, where("pageCount", "==", 200));
      onSnapshot(q, (ss) => {
        let books = [];
        ss.docs.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        console.log(books);
      });

      //****** VERİ GÜNCELLEME  ****/
      const docRef = doc(db, "books", "YQ0NRUqFdRVKxedWK0SO");
      updateDoc(docRef, { pageCount: 1000 });

      return docdata;
    });
     return {
      state,nam,nami,asd,bakar,eren,ethm
    };
  },
};
</script>
