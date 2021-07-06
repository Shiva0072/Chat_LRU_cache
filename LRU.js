export {Chathandler, chat_names}

const chat_names=["Bhaiya","Munna Bhaiya","Hero","Ayush","Aananya","Daddy","Mom"];
const chat_name_length= chat_names.length;
const chat_msg=["Kha ho ?","Kiski fielding lagana hai babu ?","Ajj momo khane chaloge ?","Kab miloge ?","Hey !","Kab tak ghar ana hai ?","Daddy bula rhe hai! "];
const chat_msg_length=chat_msg.length;
const chat_img_length=7;

class Chathandler{
    constructor(chat_template, chat_list){
        this.hashmap=new Map();              //initialize the unordered_map
        this.linked_list=null;               //initialize doubly LinkedList
        this.chat_template=chat_template;
        this.chat_list=chat_list;
        let clock=new Date();                //date will be required
        this.hours=clock.getHours();
        this.mins=clock.getMinutes();
    }

    getTime(){
        //Time stamps creation for messages
        this.mins+=1;
        if(this.mins>=60){
            this.hours+=1;
            this.mins=0;
        }
        if(this.hours===24){
            this.hours=0;
        }
        //HH:MM
        return ("0"+this.hours).slice(-2)+":"+("0"+this.mins).slice(-2);
    }

    createNode(id){
        //creating node element
        //each node will contain the pointers[ryt,lft] and data of user
        let node={}; 
        //pointers to prev and next
        node['next']=null;
        node['prev']=null;
        //create a copy of this template [HTML template]
        let chat_item=this.chat_template.cloneNode(true);
        //setting the name, message, img to the template item
        chat_item.querySelector("#Name").innerText=chat_names[id%chat_name_length];
        chat_item.querySelector("#Message").innerText=chat_msg[id%chat_msg_length];
        // console.log("./images/avatar"+eval(1+(id%chat_img_length))+".png");
        console.log(`./images/avatar${1+(id%chat_img_length)}.png`);
        chat_item.querySelector("#Images").src=`./images/avatar${1+(id%chat_img_length)}.png`;
        // chat_item.querySelector("#Images").src="./images/avatar"+eval(1+(id%chat_img_length))+".png";
        node['chat_item']=chat_item; //node data
        return node;    // a complete node, containing details of user
    }
    
    newMsg(id){
        let node=null;
        if((id in this.hashmap)===false){//person with this id is not present
            node=this.createNode(id);
            this.hashmap[id]=node;
        }
        else{ //person is already present. node is there in LL and details in HM[hashmap]
            node=this.getNodeFromList(id);
        }
        ///some other possible cases
        //LL is empty
        if(this.linked_list===null){
            //set this node as the head of LL
            this.linked_list=node;
        }
        else{//LL is not empty. add the node to LL and make this node as the head of the LL
            node['next']=this.linked_list;       //node->LL
            if(this.linked_list!==null){          //if not this LL->Null  
                this.linked_list['prev']=node;    //make node->,<-LL    [doubly LL]
            }
            this.linked_list=node;                //LL->,<-node->head
        }
        this.updateList();
    }

    deleteMsg(id){
        let node= this.getNodeFromList(id);  //this will delete the node from the LL. return the data with next and prev set to null 
        //now remove the node from the HM as well
        delete this.hashmap[id];
        //clear entry from the HM
        this.updateList();
    }

    getNodeFromList(id){
        let node=this.hashmap[id];
        let prevNode=node['prev'];
        let nextNode=node['next'];

         //update prev and next node pointers of the doubly LL's node
        if(prevNode!=null){
            prevNode['next']=nextNode;
        }
        if(nextNode!=null){
            nextNode['prev']=prevNode;
        }

        //update the head of LL
        if(node===this.linked_list){//Incase this node which we are removing was head of LL. then set the nextNode as the new head
            this.linked_list=nextNode;
        }
        node['next']=null;  //empty the next and prev pointers of this node
        node['prev']=null;
        return node;   //just return the node template with data and next and prev set to null[not pointing to any node]
    }

    updateList(){
        //update teh contents of the chat list. [updating the HTML page]
        let innerHTML='';
        let head=this.linked_list; //iterator for traversing the LL
        while(head!==null){
            let element=head['chat_item'];
            if(head===this.linked_list){
                element.className="ks-item ks-active";   //a different styling for the head node of the LL
                element.querySelector("#Time").innerText=this.getTime();
            }
            else{
                element.className="ks-item"; //rest of the chats will have same styling 
            }
            innerHTML+=element.outerHTML;
            head=head['next']; //update the head and move ahead
        }
        this.chat_list.innerHTML=innerHTML;     
    }
}