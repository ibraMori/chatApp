# Question 1: Analyse du code existant

# App.js

App.js est le composant principal de l’application React.
Il gère l’état global de connexion de l’utilisateur et décide quel composant afficher. 
Dans notre cas soit l'interface Join.js, ou celui de Chat.js. 
Il sert aussi de point central pour transmettre les informations comme le nom d’utilisateur et la salle.

# Chat.js

Chat.js contient l’interface principale de la discussion.
Il permet l’envoi des messages via Socket.io, la réception des messages des autres utilisateurs,

l’affichage de la liste des messages et la gestion de la saisie de message,
Ce composant utilise également Sidebar.js pour afficher les participants de la salle.

# Message.js

Message.js est un composant de présentation utilisé pour afficher un message individuel dans la conversation.
Il reçoit les données du message (auteur, message, heure) et les affiche dans la zone de discussion.

# Sidebar.js

Sidebar.js affiche les informations de la salle de discussion.
Il contient : la liste des utilisateurs(participants) connectés dans la room.


#Join.js

Join.js est le formulaire d’entrée dans le chat.
Il permet à l’utilisateur : d’entrer son nom d’utilisateur, de choisir une salle de discussion,
de rejoindre la room en envoyant les informations au serveur via Socket.io.

# server.js

server.js est le serveur Node.js utilisant Socket.io.
Il gère : les connexions des utilisateurs, la création et gestion des rooms,
la diffusion des messages aux membres de la salle, les événements comme l’arrivée ou le départ d’un utilisateur.

# SocketContext.js

SocketContext.js crée un contexte React pour partager l’instance Socket.io dans toute l’application.
Grâce à ce contexte, les composants comme Chat.js ou Sidebar.js peuvent accéder au socket avec un hook (useSocket) sans devoir recréer une connexion au serveur.

# question 2

# comment le socket est creee et partage entre tous les composants React
La connexion Socket.io est créée dans le fichier SocketContext.js.
Ce fichier crée un React Context contenant l’instance du socket connecté au serveur.
le fichier est exporte avec export function socketprovider a tous les enfants.
il comprend aussi un hook qui est importe par les enfants pour manipuler le socket

# quel evenement socket.io quand un user quitte
c'est l'evenement Disconnect.
cet évènement recupère la room et l'utilisateur actuelle, puiis
il retourne une room en filtrant l'utilisateur qui a quitté
un message système est emit pour signaler que l'utilisateur a quitte

#
Le serveur utilise Socket.io pour diffuser le message à tous les utilisateurs de la room, après chaque envoie de message dans chat.
Dans l’application de chat, on utilise io.to(room).emit() afin que tous les membres de la salle reçoivent le message,
y compris l’utilisateur qui l’a envoyé.