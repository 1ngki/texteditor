Vue.component('modal', {
  template: `
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <!-- default footer -->
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
  `,
});

var app = new Vue({
  el: '#app',
  data: {
    url: '',
    showModal: false,
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
        document.execCommand('insertImage', false, reader.result);
      };
    },
    submit() {
      document.execCommand('insertImage', false, this.url);
    },
  },
});
