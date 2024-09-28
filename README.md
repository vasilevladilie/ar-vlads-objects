# AR-VLADS-OBJECTS

- Pentru dezvoltarea acestui proiect s-a inceput prin a modifica proiectul exemplu original ViroSample creat cu ajutorul comenzii `react-viro init ViroSample`. Primele modificari au constat in refactorizarea implementarii care utiliza React Class Component prin utilizarea de component functionale
React Native si introducerea de react hooks pentru gestionarea starilor acestor component, react hook-urile avand proprietatea de a relansa randarea aplicatiei atunci cand starea componentei se schimba sau a efectua anumite actiuni atunci cand starea se schimba.

- Prin urmarea acest proiect studieaza creeare de lumi virtuale augmentate cu obiecte capabile de raspuns la interactiunea utilizatorului cu lumea.

## Functionalitati:

- Proiectul are o aplicatie care permite navigarea intre diverse tipuri de scene:
     - O scena Hello World care afiseaza un text
        - aceasta scena a fost refactorizata in asa fel incat foloseste componente react native declarate functional si hooks pentru state;
        - O scena VR care nu a fost modificata, ea facand parte din proiectul initial ViroSample;
        - Scena AR pe care pregatit-o pentru proiectul tema de laborator pentru disciplina Inteligenta Ambientala si Realitate Augmentata:
            - scena care prezinta o plansa orizontala si o minge de baschet, capabile de coliziuni.

- Pentru a lansa scene cu vizualizare a lumilor AR am folosit o componenta React Viro `ViroARSceneNavigator`, reprezentand punctul de intrare pentru aplicatii AR cu Viro. Pentru proiectul tema de laborator aplicatia va afisa in interfata butonul cu textul `AR-Vlads-Objects!`, acesta la apasara va duce utilizatorul intr-o noua lume cu realitate augmentata care va permite experimentarea cu obiecte randate in noua lume, obiecte cu caracteristici fizice randate pe baza interactiunii dintre mai multe componente: lumini, materiale si forme geometrice 3D. Pentru a demonstra capabilitatile bibleotecii cu componente AR React Viro dezvoltata de Viro Media scena va lua in considerare si colizunile dintre doua obiecte din scene, unul dinamic mingea de baschet si celalalt static platforma orizontala, prin urmare cand minge atinge platforma plana culoarea acesteia se va schimba ca efect al coliziunii si procesarii acesteia.

## Obiecte virtuale:
Obiectele 3D virtuale sunt introduse cu componenta React Viro `Viro3DObject`. Scena `VladsObjectsSceneAR` corespunzatoare navigatorului de scena care raspunde la apasarea butonului `AR-Vlads-Objects!` contine urmatoarele elemente cu documentatia lor extrasa din implementarea scenei (am apucat deja sa le scriu in limba engleza si le extrag in documentatia proiectului asa cum sunt):

**I**. Scene lighting
 - ViroAmbientLight;
 - ViroLightingEnvironment.

**II**. Text that presents the topic of the application inside the augmented world, the project title and the discipline that supports the project:
- ViroNode that contains two text components:
- ViroText text={projectDiscipline};
- ViroText text={projectName}.

**III**. World plane that has a horizontal plane detector embedded, first plane detected gets fixed and is displayed as solid ground capable of collisions and support for world physics and positive mass objects interactions in a world with gravity enabled.
- ViroARPlane

**IV**. AR scene node placed where the horizontal plane has been dectected by previous component Viro AR Plane:
- ViroNode specifies a position attribute that sets the position of the node in the processed world: `position={planeData.planePosition}`.

**V**. AR node controller for actions. Bind controls for interacting with the scene, in this implementation actually the controller transform is used when interacting with the ball on push operation:
- ViroController

**VI**. AR basketball 3D object. Loaded from a VRX model for Virtual Reality Extended rendering. This works as a solution for Physically Based Rendering inside Viro Media applications. VRX is originally FBX, that is an expansive and flexible 3D model format supported by most 3D authoring software. To load FBX files, use the ViroFBX script to convert the FBX file into a VRX file, ViroFBX script works only on MacOS :-D. The 3D model has some png resources that are used as mesh materials. The world lighting together with the model geometry specification and the mesh materials render the object 3D, this time the object is a basketball:
- Viro3DObject source={require("./res/basketball/object_basketball_pbr.vrx")}

This 3D Object, the basketball has physics properties attached such that when is rendered the physics of the world are going to manifest over the ball as gravity, friction and accelaration according to the object's mass: `physicsBody={{ friction: 0.6, type: "Dynamic", mass: 4, enabled: true, useGravity: true..`, because the object has transformation according to these forces it's type is 'Dynamic'.

**VII**. AR surface used as ground. This component is very important for the world interaction:
- it creates a thin horizontal plane at the place where the AR plane detector first detects an horizontal plane;
- the plane enables object AR world collision, interactions and state detection;
The rendered plane has an on click state handler that uses the transform (position and state) of the camera and the transform of the basketball to pull the basketball towards the camera on user interaction with the plane such that the ball will be seen rolling towards the camera. If the basketball falls of this plane is lost: can be seen sinking into the beneath abyss, the React Viro component that is used to lay this plane is:
    - ViroQuad

## Algorithms:
The module with AR scene that shows collision detected and processed between two types of objects, the static type object, the horizontal plane and the dynamic type object, the basketball has two transformation algorithms:
- Pull operation algorithm:
    - Operation: pull;
    - Operands: camera, ball;
    - Pull the ball with a constant force towards the camera:
        - to do this it creates a forces vector based on the position of the camera, position of the ball and some strength of pull multiplier.
- Push operation algorithm
    - Operation: push;
    - Operands: controller, ball;
    - Push against the ball with an impulse force, at the onClicked location, a force direction originating from the controller (controller forward):
        - works by creating an impulse from the controller - user position - with a strength multiplier, then applies this impulse to the ball directing it through a vector result of the difference between the current position of the ball and the clicked position.

- To handle the collisions and create a displayable effect the horizontal plane has a handler registered to his on collisions callback:
    - the algorithm just toggles the state of the materials native property when the ground gets hit.
- One more algorithm uses a reference from the React Native function component declared using `useRef` to pause the plane detections done by the `ViroARPlane` after it founds just one, locking the horizontal plane on entire application lifecycle. The properties of the horizontal plane are here set through React Native state hook that re-renderes the scene elements on state values update, triggering this way the horizontal plane rendering at the anchor position specified by the handler attached to the, ViroARPlane detector, anchor found callback.
