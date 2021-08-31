import { Component, OnInit } from "@angular/core";
import { Edge, Node, Network, DataSet } from "vis";
import { DataService } from "../../service/data.service";

@Component({
  selector: "app-network",
  templateUrl: "./network.component.html",
  styleUrls: ["./network.component.css"],
})
export class NetworkComponent implements OnInit {
  nodes: Array<{ id: number; label: string }>;
  edges: Array<{ from: number; to: number }>;
  network: Network;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.nodes.subscribe((nodes) => {
      (this.nodes = nodes), this.updateGraph();
    });
    this.dataService.edges.subscribe((edges) => {
      (this.edges = edges), this.updateGraph();
    });
  }

  updateGraph() {
    const container = document.getElementById("networkGraph");
    const data = {
      nodes: new DataSet<Node, "id">(this.nodes),
      edges: new DataSet<Edge, "id">(this.edges),
    };
    const options = {
      manipulation: {
        enabled: true,
        initiallyActive: true,
        addNode: (nodeData, callback) => {
          this.addNewNode();
          callback(nodeData);
        },
        addEdge: (edgeData, callback) => {
          this.addNewEdge(edgeData);
          callback(edgeData);
        },
        deleteNode: false,
        deleteEdge: false,
        editNode: (editData, callback) => {
          this.editNodeLabel(editData, callback);
        }
      },
    };
    this.network = new Network(container, data, options);
  }

  addNewNode() {
    const nodeAdded = {
      label: "new",
      id: this.nodes.length + 1,
    };
    this.dataService.addNode(nodeAdded);
  }

  addNewEdge(edgeData) {
    this.dataService.addEdge(edgeData);
  }

  editNodeLabel(editData, callback) {
    let newLabel = prompt("Please enter node label: ", editData.label);
    if(newLabel.length > 0){
      this.dataService.editNodeLabel(editData.id, newLabel);
    }
    callback({...editData, label: newLabel});
  }
}
