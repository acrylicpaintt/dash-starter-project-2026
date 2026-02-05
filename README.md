# Starter Project

Welcome to the Dash Starter Project!

From the project directory, run
* `npm install` (you only need to do this if you are running it for the first time!)
* `npm start`
* `go to http://localhost:3000` in Chrome or Firefox

If you have issues (or if you're running it for the first time), run `npm install` in the project directory and repeat the above steps.

**Overall**:
- Resize button is in the bottom right handle of all of the freeform
  
**Each button and what it does:**
+ Text Node => adds a Text Node to the collection you are in --- if you are in freeform view, you can edit the text (although you have to interact with the buttons above the textbox to edit the text)
+ Image Node => adds an Image Node to the collection you are in
+ Video Node => adds a Video Node to the collection you are in
+ Website Node => adds a Website Node to the collection you are in
+ Free Collection => adds a Freeform Collection Node to the collection you are in
+ Tree Collection => adds a Tree Collection Node to the collection you are in
+ Set Collection => If the user is selecting only one collection (tree or freeform) node, sets that as the new collection to add nodes into. If not, shows error message on the menubar
+ Link Two => If the user is selecting 2 nodes in the same collection, links them together (visible in freeform by column on the right, visible in tree as it gets added to the list of linked nodes (no button as if they are linked -> same collection, so they should be easy to find))
+ Delete Selected => Deletes all selected nodes (no matter what collection they are in or how many) / if selected node includes a collection that is the main collection -> sets collection as main collection by default -- doesn't work if the selected node is a collection that had the current collection, unfortunately
+ Collection Main => reverts the current collection nodes are being added to to be the main collection
+ Switch View => changes the main canvas from freeformCanvas to treeCanvas and shows everything in a tree view
+ Deselect All => deselects all nodes (thought it would be useful in cases of deleting nodes or when you are selecting a node that is in another collection and you cant see it)
