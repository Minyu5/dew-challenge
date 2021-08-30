import { Component, OnInit } from "@angular/core";
import { DataService } from "../../service/data.service";

@Component({
  selector: "app-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.css"],
})
export class TextBoxComponent implements OnInit {
  nodes: Array<{ id: number; label: string }>;
  edges: Array<{ from: number; to: number }>;
  nodeIdLabelMap: Map<number, string>;
  newNode: string;
  fromNode: { id: number; label: string };
  toNode: { id: number; label: string };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.nodes.subscribe((nodes) => {
      (this.nodes = nodes)
    });
    this.dataService.edges.subscribe((edges) => {
      (this.edges = edges)
    });
    this.dataService.nodeIdLabelMap.subscribe((nodeIdLabelMap) => {
      (this.nodeIdLabelMap = nodeIdLabelMap)
    });
  }

  addNewNode() {
    const nodeAdded = {
      label: this.newNode,
      id: this.nodes.length + 1,
    };
    this.dataService.addNode(nodeAdded);
    this.newNode = "";
  }

  addNewEdge() {
    if(this.fromNode && this.toNode ){
      const edgeAdded = {
        from: this.fromNode.id,
        to: this.toNode.id,
      };
      this.dataService.addEdge(edgeAdded);
    } else {
      alert("please reselect nodes you want to link");
    }
    this.fromNode = null;
    this.toNode = null;
  }
}
