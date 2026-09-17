/**
 * Topic 13: Real-World Machine Learning Examples
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "How does Netflix utilize Machine Learning for its Movie Recommendation System?",
    "shortAnswer": "By combining Matrix Factorization, Deep Autoencoders, Contextual Bandits, and personalized artwork generation based on user watch histories.",
    "explanation": "Netflix's recommendation engine combines collaborative filtering (capturing latent viewer taste vectors) with contextual ranking algorithms (time of day, device, viewing duration) and multi-armed bandits to dynamically customize thumbnails displayed to each user.",
    "hint": "Collaborative filtering + contextual ranking + personalized artwork selection.",
    "level": "Basic",
    "codeExample": "# Recommendation score: Score(u, i) = w_cf * CollabScore(u, i) + w_ctx * ContextScore(u, i)"
  },
  {
    "id": 2,
    "question": "How does Google Maps predict Estimated Time of Arrival (ETA) and traffic congestion?",
    "shortAnswer": "By applying Spatio-Temporal Graph Neural Networks (DeepMind) and historical traffic velocity vectors across road segment graphs.",
    "explanation": "Google Maps models global road networks as massive graphs where intersections are nodes and road segments are edges. Graph Neural Networks propagate live vehicle speeds and historical traffic flow patterns to predict future travel times across complex urban road segments.",
    "hint": "Spatio-Temporal Graph Neural Networks simulating traffic flow dynamics.",
    "level": "Moderate",
    "codeExample": "# Graph Neural Network: Node_v(t+1) = Aggregate(Neighbors(v), Edge_Speeds, Historical_Priors)"
  },
  {
    "id": 3,
    "question": "How do E-Commerce platforms (Amazon, Flipkart) optimize dynamic logistics and warehouse routing?",
    "shortAnswer": "By combining predictive demand forecasting models with Reinforcement Learning and genetic algorithms to optimize picking paths and delivery routes.",
    "explanation": "ML algorithms forecast local SKU purchase density to pre-position inventory in regional fulfillment centers. Reinforcement learning agents optimize autonomous Kiva robot picking paths in warehouses, while Vehicle Routing Problem (VRP) heuristics optimize delivery van routes.",
    "hint": "Predictive inventory pre-positioning + automated robotic warehouse route optimization.",
    "level": "Basic",
    "codeExample": "# Pre-positioning: If Forecast(SKU_12, Kolkata_Hub) > 500: Ship batch from central warehouse"
  },
  {
    "id": 4,
    "question": "How does Spotify's 'Discover Weekly' playlist generation pipeline work?",
    "shortAnswer": "By blending Collaborative Filtering (playlist co-occurrence), Natural Language Processing (music blog scraping), and Raw Audio Spectrogram CNN analysis.",
    "explanation": "Spotify processes 1. User playlist co-occurrences via matrix factorization; 2. NLP cultural descriptions from music blogs/reviews; 3. 30-second raw audio spectrograms analyzed by deep CNNs to detect acoustic properties (tempo, key, danceability, timbre) for new songs with zero listening history (solving the Cold Start problem).",
    "hint": "Tripartite engine: Collaborative filtering + NLP cultural analysis + Audio CNN acoustics.",
    "level": "Moderate",
    "codeExample": "# 3 components: User-Playlist Matrix + Web NLP Sentiment + Audio Spectrogram CNN Vector"
  },
  {
    "id": 5,
    "question": "How does Uber's Dynamic Surge Pricing and Driver Matching algorithm function?",
    "shortAnswer": "Spatio-temporal time-series regression (H3 hexagonal spatial grid) forecasts supply-demand imbalances 15-30 minutes ahead to set surge multipliers.",
    "explanation": "Uber divides cities into H3 hexagonal spatial cells. GBDT and LSTM models forecast rider request volumes and available driver vectors per hexagon. When forecasted demand exceeds supply, surge multipliers automatically incentivize drivers to relocate toward high-demand zones.",
    "hint": "Hexagonal spatial grid forecasting supply-demand deficits to calibrate surge fares.",
    "level": "Moderate",
    "codeExample": "# Uber H3 Hexagonal Grid Matching: surge = f(demand_h3, supply_h3, weather, traffic)"
  },
  {
    "id": 6,
    "question": "How do Commercial Airlines optimize Passenger Revenue via Dynamic Seat Pricing?",
    "shortAnswer": "By modeling booking arrival Poisson processes and willingness-to-pay elasticity curves to dynamically allocate fare classes.",
    "explanation": "Airlines use Expected Marginal Seat Revenue (EMSR) algorithms and machine learning elasticity models. As departure day approaches, algorithms estimate business traveler demand curves, closing discount buckets and opening high-fare business tiers to maximize flight revenue.",
    "hint": "Expected Marginal Seat Revenue (EMSR) balancing booking pace against price elasticity.",
    "level": "Moderate",
    "codeExample": "# EMSR Algorithm: Protect S seats for high fare if Fare_High * P(Demand > S) >= Fare_Discount"
  },
  {
    "id": 7,
    "question": "How do Modern Smartphone Cameras (e.g. Google Pixel, Apple iPhone) perform Computational Photography (Night Sight, Portrait Mode)?",
    "shortAnswer": "By capturing a burst of raw underexposed frames, aligning them via optical flow, and fusing them through deep convolutional denoising autoencoders.",
    "explanation": "Instead of a single long exposure (which causes motion blur), the camera captures 9-15 rapid underexposed raw frames. Deep neural networks align the tiles, filter noise, fuse dynamic range (HDR+), and predict monocular depth maps for synthetic portrait bokeh blurring.",
    "hint": "Burst frame alignment + multi-exposure deep neural fusion and monocular depth maps.",
    "level": "Moderate",
    "codeExample": "# Computational HDR: Burst Alignment -> Tile Denoising -> Neural Tone Mapping -> Synthetic Bokeh"
  },
  {
    "id": 8,
    "question": "How does Shazam identify songs in noisy environments in under two seconds?",
    "shortAnswer": "By extracting combinatorial hash pairs of peak frequency spectrogram constellation points and matching time offsets in a database index.",
    "explanation": "Shazam transforms audio into a 2D Spectrogram (Time vs Frequency). It extracts local energy peaks (Constellation Map), pairs peaks together into hash keys (Freq1_Freq2_DeltaTime), and queries a hash index. If many hashes match with a constant time offset, the song is identified.",
    "hint": "Spectrogram constellation peak pairing with time-offset hash matching.",
    "level": "Moderate",
    "codeExample": "# Hash Key: (Freq_Peak1, Freq_Peak2, Delta_Time) -> Value: (Song_ID, Timestamp_in_Track)"
  },
  {
    "id": 9,
    "question": "How does Machine Learning detect Structural Defects in Wind Turbines and Solar Farms?",
    "shortAnswer": "By processing high-resolution drone thermal / RGB imagery through YOLO object detection and semantic segmentation models to flag micro-cracks and hot spots.",
    "explanation": "Autonomous drones capture gigapixels of turbine blade surfaces and solar panels. Convolutional segmentation models locate millimeter-scale surface cracks, delamination, and photovoltaic cell junction failures, preventing multi-million rupee catastrophic breakdowns.",
    "hint": "Drone thermal and visual segmentation identifying micro-cracks and thermal hot spots.",
    "level": "Basic",
    "codeExample": "# YOLO Solar Defect: [x, y, w, h, conf, defect_type in {'hot_spot', 'cracked_cell', 'snail_trail'}]"
  },
  {
    "id": 10,
    "question": "How does Gmail's 'Smart Compose' and 'Smart Reply' generate context-aware email responses?",
    "shortAnswer": "By conditioning a lightweight sequence-to-sequence transformer on incoming email thread embeddings and decoding candidate phrases via beam search.",
    "explanation": "Smart Reply processes the inbound email through a contextual encoder, selects candidate semantic reply clusters (e.g. 'Sounds good!', 'I'll look into it'), and uses beam search decoding with high-confidence thresholds to avoid embarrassing or offensive suggestions.",
    "hint": "Lightweight sequence-to-sequence transformer beam search conditioned on email context.",
    "level": "Moderate",
    "codeExample": "# Beam Search: argmax_y prod_{t=1}^T P(token_t | token_<t, email_context)"
  },
  {
    "id": 11,
    "question": "How do Autonomous Vacuum Cleaners (e.g. Roomba) navigate homes using SLAM and Machine Learning?",
    "shortAnswer": "Simultaneous Localization and Mapping (vSLAM); fusing LiDAR, optical floor tracking, and vision object detection to construct room layout maps and avoid obstacles.",
    "explanation": "The robot combines visual SLAM (tracking keypoint landmarks across camera frames) with deep convolutional obstacle classifiers. It recognizes cables, pet waste, and rugs, dynamically altering its path planning while constructing a persistent topological room map.",
    "hint": "Visual SLAM mapping paired with deep CNN obstacle avoidance classifiers.",
    "level": "Moderate",
    "codeExample": "# SLAM State: Position (x, y, theta) updated via Extended Kalman Filter + Vision Landmarks"
  },
  {
    "id": 12,
    "question": "How does DeepMind's AlphaFold solve the 50-year-old Biological Grand Challenge of Protein Structure Prediction?",
    "shortAnswer": "By using the Evoformer neural architecture to iteratively refine Multiple Sequence Alignments (MSA) and 3D residue spatial pair representations.",
    "explanation": "AlphaFold takes a 1D amino acid sequence, extracts evolutionary relationships across homologous sequences via MSA, and uses invariant coordinate transformers to output atomic 3D Cartesian coordinates with sub-Angstrom experimental crystal accuracy.",
    "hint": "Evoformer architecture operating on Multiple Sequence Alignments and 3D spatial pair representations.",
    "level": "Expert",
    "codeExample": "# AlphaFold Output: 3D coordinates (x_i, y_i, z_i) for all N amino acid residues + pLDDT confidence"
  },
  {
    "id": 13,
    "question": "How does Tesla's Autopilot / Full Self-Driving (FSD) 'Occupancy Network' replace traditional bounding boxes in driving scenes?",
    "shortAnswer": "By converting multi-camera 2D video streams directly into a continuous 3D voxel occupancy grid with velocity vectors in real time.",
    "explanation": "Traditional object detectors struggle with odd or unrecognized road obstacles (e.g. overturned trucks, fallen trees). Tesla's Occupancy Network voxelizes the 3D world into 10cm x 10cm volumetric cubes, predicting whether each cube is occupied (free vs obstacle) and its 3D motion vector.",
    "hint": "3D volumetric voxel grid predicting occupancy probability and motion vectors directly from multi-camera feeds.",
    "level": "Expert",
    "codeExample": "# 3D Voxel Grid: V(x, y, z) in [0, 1] (Probability of physical matter occupying space)"
  },
  {
    "id": 14,
    "question": "How do Real-Time Translation Earbuds (e.g. Google Pixel Buds) perform near-instantaneous cross-lingual speech translation?",
    "shortAnswer": "By streaming audio through a streaming ASR acoustic model, Neural Machine Translation engine, and low-latency Neural Text-to-Speech (TTS) synthesizer.",
    "explanation": "The pipeline processes audio chunks in sliding streaming buffers (<300ms latency). As words are recognized, the streaming translation model uses wait-k decoding policies (translating after hearing k words) and synthesizes target audio via Tacotron/WaveNet vocoders.",
    "hint": "Streaming ASR + Wait-k Neural Translation + Fast Neural TTS Vocoder.",
    "level": "Moderate",
    "codeExample": "# Audio Stream -> Streaming Conformer ASR -> Wait-K Transformer MT -> Neural Vocoder Audio"
  },
  {
    "id": 15,
    "question": "How do Credit Card Companies process millions of transactions per second to block fraud without disrupting legitimate customers?",
    "shortAnswer": "By deploying quantized LightGBM/XGBoost models on in-memory streaming engines (Apache Flink) that evaluate hundreds of engineered features in <20 milliseconds.",
    "explanation": "Streaming engines maintain rolling state windows (e.g., transactions in last 5 minutes, velocity of spending). Quantized decision tree ensembles evaluate probability of fraud P(Fraud | x). Transactions exceeding risk threshold \u03c4 are immediately challenged with OTP or declined.",
    "hint": "In-memory streaming feature stores scoring quantized tree ensembles in under 20ms.",
    "level": "Basic",
    "codeExample": "# In-Memory Scoring: features = get_flink_state(card_id); if model.score(features) > 0.90: decline()"
  },
  {
    "id": 16,
    "question": "How does TikTok's 'For You' Page (FYP) algorithm achieve industry-leading user engagement?",
    "shortAnswer": "By rapidly updating user interest vectors in real time based on micro-signals (watch-time percentage, loop replays, pause locations, instant skips).",
    "explanation": "Unlike platforms relying on explicit likes or subscriptions, TikTok tracks precise consumption micro-signals. If a user watches a 15-second clip 3 times (looping), the embedding for that specific audio/visual topic is immediately reinforced in the user's real-time interest vector within seconds.",
    "hint": "Real-time vector updates driven by granular video watch-time and loop replay micro-signals.",
    "level": "Basic",
    "codeExample": "# Micro-Signal: Weight = (Watch_Time / Video_Duration) * (Replay_Count + 1) - Skip_Penalty"
  },
  {
    "id": 17,
    "question": "How does Machine Learning power Automated High-Throughput Sorting in Recycling Facilities?",
    "shortAnswer": "High-speed camera conveyor belts pass images through YOLO object detectors that trigger precise pneumatic compressed-air nozzles to divert plastics, metals, and paper.",
    "explanation": "Conveyor belts moving at 3-5 meters/second pass waste under optical sensors. CNN models classify material types (PET, HDPE, Aluminum) in 10ms and compute target coordinates. Millisecond pneumatic air jets shoot brief bursts of air to blast designated items into sorting bins.",
    "hint": "High-speed vision classification triggering millisecond pneumatic air sorting jets.",
    "level": "Basic",
    "codeExample": "# Real-time sorting: If detected == 'PET_Plastic': trigger_air_nozzle(x_pos, timestamp + delta_t)"
  },
  {
    "id": 18,
    "question": "How does Duolingo optimize personalized language learning using its 'Birdbrain' Machine Learning model?",
    "shortAnswer": "Item Response Theory (IRT) and Deep Factorization Machines dynamically predict the probability that a student will answer a specific exercise correctly.",
    "explanation": "Birdbrain maintains a continuous latent ability score \u03b8 for each student and a difficulty rating \u03b2 for every exercise. It selects exercises where the probability of correct answer is ~75-80%, maximizing student learning flow state without inducing boredom or frustration.",
    "hint": "Item Response Theory predicting student success probability to maintain optimal flow state.",
    "level": "Moderate",
    "codeExample": "# IRT Probability: P(Correct) = 1 / (1 + exp(-(Ability_Theta - Difficulty_Beta)))"
  },
  {
    "id": 19,
    "question": "How do Agricultural Fruit Harvesting Robots (e.g. Apple Picking Robots) identify ripe fruit in chaotic orchard canopies?",
    "shortAnswer": "By using RGB-D (color + depth) vision models to segment ripe fruit, compute 3D centroid coordinates, and plan collision-free robotic arm trajectories.",
    "explanation": "Robotic harvesters use instance segmentation (Mask R-CNN) to detect fruit amidst occluding foliage and variable sunlight. Depth sensors calculate the 3D grasping position, and inverse kinematics algorithms guide soft silicone pneumatic grippers to pluck fruit without bruising.",
    "hint": "RGB-D instance segmentation + 3D centroid calculation + robotic trajectory planning.",
    "level": "Moderate",
    "codeExample": "# Fruit Harvest Pipeline: Mask_RCNN(RGB) + Depth_Map -> 3D_Coordinate (X, Y, Z) -> Robotic Gripper Motion"
  },
  {
    "id": 20,
    "question": "How do Smart Thermostats (e.g. Google Nest) learn homeowner schedules to optimize HVAC energy consumption?",
    "shortAnswer": "By combining PIR motion sensor activity logs, thermal regression decay models, and reinforcement learning to pre-heat/cool homes before occupants arrive.",
    "explanation": "Nest models the thermodynamic heat loss rate of the building: dT/dt = f(Outdoor_Temp, HVAC_Power, Building_Insulation). By learning household wake/leave/return time distributions, it initiates pre-conditioning just in time while shutting off energy during vacant hours.",
    "hint": "Thermodynamic heat-loss modeling + occupancy probability time distribution.",
    "level": "Basic",
    "codeExample": "# Auto-Schedule: If P(Occupancy @ 18:00) > 0.85: Start heating at 17:30 to reach 22\u00b0C"
  },
  {
    "id": 21,
    "question": "How does Zoom's 'Virtual Background' isolate users without a physical green screen in real time?",
    "shortAnswer": "By running an ultra-lightweight MobileNet/UNet semantic portrait segmentation neural network at 60 FPS on the client's local CPU/GPU.",
    "explanation": "The model processes low-resolution camera frames (e.g. 256x256), outputting a continuous alpha matte mask M(x, y) \u2208 [0, 1] distinguishing human pixels from background. The compositing shader blends: Pixel_Out = M * Person_Cam + (1 - M) * Virtual_BG.",
    "hint": "Real-time client-side neural portrait alpha matting running at 60 FPS.",
    "level": "Basic",
    "codeExample": "# Alpha compositing: output_pixel = alpha * webcam_pixel + (1 - alpha) * background_image_pixel"
  },
  {
    "id": 22,
    "question": "How do Banks and FinTechs automate Document KYC (Aadhaar / PAN Card Verification) using Machine Learning?",
    "shortAnswer": "By combining OCR text extraction, YOLO card orientation alignment, anti-spoofing liveness detection, and face embedding matching.",
    "explanation": "1. Edge detection aligns rotated ID cards; 2. OCR extracts Name, DOB, and ID Numbers; 3. Liveness models detect whether the user's selfie is a live human or a printed photo/screen replay attack; 4. FaceNet verifies that the selfie matches the ID card photo.",
    "hint": "Card alignment + OCR extraction + Selfie liveness detection + Face verification matching.",
    "level": "Basic",
    "codeExample": "# KYC Verification: Is_Liveness_Valid(selfie) and (Face_Distance(selfie, id_photo) < 0.4)"
  },
  {
    "id": 23,
    "question": "How do Modern Video Games (e.g. NVIDIA DLSS) use Deep Learning to upscale low-resolution frames to 4K in real time?",
    "shortAnswer": "Deep Learning Super Sampling (DLSS); an autoencoder reconstructs high-resolution 4K frames from low-resolution 1080p rendering and motion vectors.",
    "explanation": "Rendering natively at 4K at 120 FPS is computationally punishing. The GPU renders internally at 1080p (4x fewer pixels) and uses dedicated Tensor Cores running a trained temporal convolutional autoencoder to reconstruct sharp 4K frames with sub-pixel temporal anti-aliasing.",
    "hint": "Temporal deep convolutional autoencoders reconstructing 4K frames from 1080p renders.",
    "level": "Expert",
    "codeExample": "# DLSS Pipeline: Frame_1080p(t) + Motion_Vectors + History_Buffer -> Tensor_Core_CNN -> Frame_4K(t)"
  },
  {
    "id": 24,
    "question": "How does Deep Reinforcement Learning control Tokamak Nuclear Fusion Plasma (Google DeepMind & EPFL)?",
    "shortAnswer": "A deep neural policy network adjusts 19 magnetic coil voltages 10,000 times per second to sculpt and stabilize 100-million-degree hydrogen plasma.",
    "explanation": "Nuclear fusion plasma is chaotic, non-linear, and unstable. Traditional controllers required separate controllers for shape, position, and stability. DeepMind trained a single reinforcement learning policy in a physics simulator to stabilize non-circular plasma configurations in real Tokamaks.",
    "hint": "Reinforcement learning policy network controlling magnetic coils at 10 kHz.",
    "level": "Expert",
    "codeExample": "# 10 kHz RL Control: State(Magnetic Sensors) -> Policy_Net -> Action(19 Coil Voltages)"
  },
  {
    "id": 25,
    "question": "How do Smart Water Management Utilities predict Pipe Bursts and Water Leaks under city streets?",
    "shortAnswer": "By analyzing acoustic hydrophone sensor time-series and pressure transient fluctuations using 1D CNNs and anomaly detection models.",
    "explanation": "Water pipe micro-cracks produce distinct high-frequency acoustic hiss sounds that travel along pipe walls. Acoustic loggers record overnight audio; 1D convolutional models classify the acoustic frequency signatures, pinpointing leak locations within 1 meter before major road collapses occur.",
    "hint": "Acoustic sensor time-series classification detecting pipe fracture sound frequencies.",
    "level": "Moderate",
    "codeExample": "# Acoustic Leak Detection: Spectrogram(Pipe_Audio) -> 1D_CNN -> P(Leak_Present)"
  },
  {
    "id": 26,
    "question": "How does Airbnb price listings dynamically using its 'Smart Pricing' Machine Learning engine?",
    "shortAnswer": "By combining lead time, local seasonal demand, neighborhood event density, host calendar availability, and price elasticity curves via GBDTs.",
    "explanation": "Smart Pricing estimates the probability P(Booking | Price) for each calendar day. The engine recommends the exact nightly price that maximizes the host's expected revenue (Price * P(Booking)), taking into account local conventions, holidays, and hotel occupancy.",
    "hint": "Expected revenue maximization: argmax_price [ Price * P(Booking | Price, Features) ].",
    "level": "Moderate",
    "codeExample": "# Smart Pricing: Revenue = Price * Booking_Probability_Model.predict(Price, Features)"
  },
  {
    "id": 27,
    "question": "How does Machine Learning enable Automated Wildlife Conservation (e.g. anti-poaching tracking)?",
    "shortAnswer": "Camera trap photos and acoustic forest audio feeds are analyzed by lightweight CNNs to detect endangered species and illegal human poacher intrusions.",
    "explanation": "Solar-powered camera traps in national parks run edge CNN models (like Megadetector). When a poacher, rifle, or snare vehicle is detected, the device transmits instant GPS coordinates via satellite modem to forest rangers in real time.",
    "hint": "Edge CNN vision models on solar camera traps transmitting satellite alerts.",
    "level": "Basic",
    "codeExample": "# Edge Detection: If detected in ['poacher', 'vehicle', 'chainsaw']: send_satellite_alert(GPS)"
  },
  {
    "id": 28,
    "question": "How does Grammarly provide real-time spelling, grammar, and tone corrections?",
    "shortAnswer": "By using sequence-to-sequence Masked Language Models and grammatical error correction (GEC) transformers conditioned on style and clarity objectives.",
    "explanation": "Grammarly parses text into subword token sequences. A transformer encoder-decoder model evaluates edit operations (Insert, Delete, Replace) over the sentence, scoring candidate revisions against fluency and tone objectives (Formal, Friendly, Concise).",
    "hint": "Grammatical Error Correction (GEC) sequence-to-sequence transformer editing.",
    "level": "Basic",
    "codeExample": "# GEC Model: Input: 'He do not has...' -> Output: 'He does not have...'"
  },
  {
    "id": 29,
    "question": "How do Autonomous Maritime Cargo Ships navigate international ocean lanes using ML?",
    "shortAnswer": "By combining marine Radar/AIS data, satellite weather forecasts, and deep reinforcement learning to optimize fuel-efficient ocean routes and avoid collisions (COLREGs).",
    "explanation": "Autonomous ships run AI navigation officers that comply with International Regulations for Preventing Collisions at Sea (COLREGs). Computer vision thermal cameras detect small unflagged fishing vessels, while hydrodynamic reinforcement learning optimizes engine RPM against wave patterns.",
    "hint": "COLREGs collision avoidance compliance + weather-routing reinforcement learning.",
    "level": "Moderate",
    "codeExample": "# COLREGs rule engine: If Vessel_Bearing_Right: Action = Alter_Course_To_Starboard()"
  },
  {
    "id": 30,
    "question": "What is the common architectural blueprint shared by almost all modern real-world enterprise ML systems?",
    "shortAnswer": "Data Ingestion Pipeline \u2192 Distributed Feature Store \u2192 Batch/Streaming Training Pipeline \u2192 Model Registry & CI/CD \u2192 Low-Latency Serving API \u2192 Observability & Drift Monitoring.",
    "explanation": "Across all industries (finance, healthcare, retail, gaming), successful real-world ML is not just a standalone algorithm or Jupyter Notebook. It is a resilient software engineering architecture that automates data flow, maintains reproducibility, enforces data quality, and continuously monitors business KPIs in production.",
    "hint": "End-to-end MLOps pipeline uniting data ingestion, feature store, CI/CD serving, and observability.",
    "level": "Basic",
    "codeExample": "# Production ML Stack: Kafka -> Feast -> PyTorch/XGBoost -> MLflow -> FastAPI/KServe -> Prometheus/Evidently"
  }
];

export default questions;
