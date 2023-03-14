<template>
  <div class="table-container">
    <h2>Firebase</h2>
    <table class="table is-bordered has-text-centered">
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
          <td>
            <input class="input is-primary" type="text" v-model="eren.name" />
          </td>
          <td>
            <input class="input is-primary" type="text" v-model="eren.author" />
          </td>
          <td>
            <input
              class="input is-primary"
              type="text"
              v-model="eren.pageCount"
            />
          </td>
          <td><button class="button is-warning" @click="ethm">⌨</button></td>
        </tr>
        <tr
          class="has-text-centered"
          v-for="item in state.items"
          :key="item.id"
        >
          <td class="has-text-centered has-text-weight-bold">
            {{ item.name }}
          </td>
          <td class="has-text-centered has-text-weight-normal">
            {{ item.author }}
          </td>
          <td class="has-text-centered">{{ item.pageCount }}</td>
          <td
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              flex-wrap: nowrap;
              padding-top: 0.7rem;
            "
          >
            <button
              class="button is-info"
              style="margin-right: 10px"
              @click="nam((id = item.id), (s = 'delete'))"
            >
              ❌
            </button>
            <button
              class="button is-success"
              @click="
                () => {
                  showModal = true;
                  return nam(item.id, (s = 'update'));
                }
              "
            >
              🛠
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <modal v-if="showModal" @close="showModal = false">
      <div v-for="na in asd" :key="na.id">
        <label>Book Name</label><br />
        <input class="input is-primary" type="text" v-model="na.name" /><br />
        <label>Author</label><br />
        <input class="input is-primary" type="text" v-model="na.author" /><br />
        <label>Page Count</label><br />
        <input
          class="input is-primary"
          type="text"
          v-model="na.pageCount"
        /><br /><br />
        <button
          class="button is-primary"
          @click="
            () => {
              showModal = false;
              return bakar(na);
            }
          "
        >
          KAYDET
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
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
import Modal from "../components/Modal.vue";

export default {
  name: "HomeView",
  components: { Modal },
  setup() {
    const state = reactive({
      items: [],
    });
    const eren = ref({ name: "", author: "", pageCount: "" });
    const showModal = ref(false);
    const ethm = () => {
      const db = getFirestore(fb);
      const fbRef = collection(db, "books");
      addDoc(fbRef, {
        name: eren.value.name,
        author: eren.value.author,
        pageCount: eren.value.pageCount,
      });
      fetchData();
      eren.value = { name: "", author: "", pageCount: "" };
    };


    const asd = ref([]);
    const nam = (id = id, s) => {
      asd.value = state.items.filter((item) => item.id == id);
      if (s == "update") {
      }
      if (s == "delete") {
        const docRef = doc(db, "books", id);
        deleteDoc(docRef);
        fetchData();
      }

      console.log(asd.value[0].name);
    };
    const db = getFirestore(fb);
    const bakar = (nav) => {
      console.log(nav);
      const docRef = doc(db, "books", nav.id);
      updateDoc(docRef, { ...nav });
    };
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
      state,
      nam,
      asd,
      bakar,
      eren,
      ethm,
      showModal,
    };
  },
};
</script>
