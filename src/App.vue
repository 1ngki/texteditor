<template>
  <div id="app" class="container">
    <div class="toolbar">
      <button type="button" class="btn btn-primary btn-lg" @click="bold">Bold</button>
      <button type="button" class="btn btn-primary btn-lg" @click="italic">Italic</button>
      <button type="button" class="btn btn-primary btn-lg" @click="underline">
        Underline
      </button>
      <button type="button" class="btn btn-primary btn-lg" @click="list">List</button>
      <button
        id="show-modal"
        type="button"
        class="btn btn-primary btn-lg"
        @click="showModal = true"
      >
        Attach Files
      </button>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <h4 slot="header">Insert Image</h4>
      <div slot="body">
        <form>
          <div class="form-group">
            <label for="formControlFile1">Browse to upload</label>
            <input id="formControlFile1" type="file" class="form-control-file" @change="readFile" />
          </div>
        </form>
        <button type="submit" class="btn btn-primary btn-sm" @click="isHidden = !isHidden">
          Upload
        </button>
      </div>
      <form slot="body" @submit.prevent="submit">
        <div class="form-group">
          <label for="formControlInput1">You can also provide a link from the web</label>
          <input
            id="formControlInput1"
            v-model="url"
            type="text"
            placeholder="https://example.com"
            class="form-control"
          />
          <button type="submit" class="btn btn-primary btn-sm" @click="isHidden = !isHidden">
            Submit
          </button>
        </div>
      </form>
    </modal>
    <div contenteditable="true" spellcheck="false" class="editable">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga impedit itaque natus nobis,
      suscipit vitae provident laboriosam temporibus voluptates! Impedit ducimus, aut necessitatibus
      enim labore ipsam numquam modi nobis similique?<component :is="template" v-show="!isHidden"
        ><img id="image" class="resizable-content"
      /></component>
    </div>
  </div>
</template>

<script>
import modal from '@/components/app/Modal.vue';
import VueResizable from 'vue-resizable';
export default {
  name: 'App',
  components: { modal, VueResizable },
  data: function() {
    return {
      url: '',
      isHidden: true,
      template: 'vue-resizable',
      showModal: false,
    };
  },
  methods: {
    bold() {
      document.execCommand('bold');
    },
    italic() {
      document.execCommand('italic');
    },
    underline() {
      document.execCommand('underline');
    },
    list() {
      document.execCommand('insertUnorderedList');
    },
    readFile(input) {
      let file = input.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        let image = document.getElementById('image');
        image.setAttribute('src', reader.result);
      };
    },
    submit() {
      let image = document.getElementById('image');
      image.setAttribute('src', this.url);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/dist/css/bootstrap.min.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.toolbar {
  padding-bottom: 40px;
}
.editable {
  width: 100%;
  min-height: 600px;
  text-align: left;
  word-wrap: break-word;
  padding: 20px;
  background-color: #f3f3f3;
  border-radius: 5px;
  outline: 0;
}
.resizable-content {
  height: 100%;
  width: 100%;
}
</style>
