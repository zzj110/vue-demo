import Vue, { CreateElement } from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class FilterItem extends Vue {
  public render(h: CreateElement) {
    return <div>这条是jsx搜索</div>;
  }
}
