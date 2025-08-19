# Flutter Development Cheatsheet

## Getting Started

### Installation & Setup
```bash
# Install Flutter SDK
# Download from https://flutter.dev/docs/get-started/install

# Check Flutter installation
flutter doctor

# Create new Flutter project
flutter create my_app
cd my_app

# Run the app
flutter run

# Build for different platforms
flutter build apk           # Android APK
flutter build ios           # iOS (requires Xcode)
flutter build web           # Web
flutter build windows       # Windows desktop
```

### Project Structure
```
lib/
├── main.dart              # Entry point
├── models/               # Data models
├── screens/              # UI screens
├── widgets/              # Custom widgets
├── services/             # API services
├── providers/            # State management
├── utils/                # Utility functions
└── constants/            # App constants

pubspec.yaml              # Dependencies
android/                  # Android-specific files
ios/                      # iOS-specific files
web/                      # Web-specific files
```

## Basic Widgets

### Hello World App
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Hello Flutter'),
      ),
      body: Center(
        child: Text(
          'Hello, World!',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
```

### Common Widgets
```dart
// Text Widget
Text(
  'Hello Flutter',
  style: TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
  ),
)

// Container Widget
Container(
  width: 200,
  height: 100,
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.symmetric(vertical: 8),
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(12),
    border: Border.all(color: Colors.grey),
  ),
  child: Text('Container Content'),
)

// Image Widget
Image.asset('assets/images/logo.png')
Image.network('https://example.com/image.jpg')
Image.network(
  'https://example.com/image.jpg',
  width: 200,
  height: 200,
  fit: BoxFit.cover,
)

// Icon Widget
Icon(
  Icons.home,
  size: 30,
  color: Colors.blue,
)

// Button Widgets
ElevatedButton(
  onPressed: () {
    print('Button pressed');
  },
  child: Text('Elevated Button'),
)

TextButton(
  onPressed: () {},
  child: Text('Text Button'),
)

OutlinedButton(
  onPressed: () {},
  child: Text('Outlined Button'),
)

// FloatingActionButton
FloatingActionButton(
  onPressed: () {},
  child: Icon(Icons.add),
)
```

## Layout Widgets

### Column and Row
```dart
// Column - Vertical layout
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text('Item 1'),
    Text('Item 2'),
    Text('Item 3'),
  ],
)

// Row - Horizontal layout
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    Icon(Icons.star),
    Text('Rating'),
    Text('4.5'),
  ],
)

// Expanded - Takes available space
Row(
  children: [
    Expanded(
      flex: 2,
      child: Container(color: Colors.red, height: 50),
    ),
    Expanded(
      flex: 1,
      child: Container(color: Colors.blue, height: 50),
    ),
  ],
)
```

### Stack and Positioned
```dart
// Stack - Overlay widgets
Stack(
  children: [
    Container(
      width: 200,
      height: 200,
      color: Colors.blue,
    ),
    Positioned(
      top: 10,
      right: 10,
      child: Icon(Icons.favorite, color: Colors.red),
    ),
    Positioned(
      bottom: 10,
      left: 10,
      child: Text('Bottom Left'),
    ),
  ],
)

// Center Widget
Center(
  child: Text('Centered Text'),
)

// Align Widget
Align(
  alignment: Alignment.topRight,
  child: Icon(Icons.close),
)
```

### ListView and GridView
```dart
// ListView - Scrollable list
ListView(
  children: [
    ListTile(
      leading: Icon(Icons.person),
      title: Text('John Doe'),
      subtitle: Text('Software Developer'),
      trailing: Icon(Icons.arrow_forward),
      onTap: () {},
    ),
    ListTile(
      leading: Icon(Icons.person),
      title: Text('Jane Smith'),
      subtitle: Text('Designer'),
    ),
  ],
)

// ListView.builder - Dynamic list
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(items[index]),
    );
  },
)

// GridView - Grid layout
GridView.count(
  crossAxisCount: 2,
  children: List.generate(6, (index) {
    return Container(
      margin: EdgeInsets.all(8),
      color: Colors.blue,
      child: Center(
        child: Text('Item $index'),
      ),
    );
  }),
)

// GridView.builder
GridView.builder(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,
    childAspectRatio: 1.0,
    crossAxisSpacing: 8,
    mainAxisSpacing: 8,
  ),
  itemCount: items.length,
  itemBuilder: (context, index) {
    return Card(
      child: Center(
        child: Text(items[index]),
      ),
    );
  },
)
```

## State Management

### StatefulWidget
```dart
class CounterApp extends StatefulWidget {
  @override
  _CounterAppState createState() => _CounterAppState();
}

class _CounterAppState extends State<CounterApp> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  void _decrementCounter() {
    setState(() {
      _counter--;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Counter App')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Counter Value:',
              style: TextStyle(fontSize: 18),
            ),
            Text(
              '$_counter',
              style: TextStyle(fontSize: 48, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: _decrementCounter,
                  child: Icon(Icons.remove),
                ),
                ElevatedButton(
                  onPressed: _incrementCounter,
                  child: Icon(Icons.add),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
```

### Provider Pattern
```dart
// pubspec.yaml
dependencies:
  provider: ^6.0.0

// counter_model.dart
import 'package:flutter/foundation.dart';

class CounterModel with ChangeNotifier {
  int _counter = 0;

  int get counter => _counter;

  void increment() {
    _counter++;
    notifyListeners();
  }

  void decrement() {
    _counter--;
    notifyListeners();
  }

  void reset() {
    _counter = 0;
    notifyListeners();
  }
}

// main.dart
import 'package:provider/provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => CounterModel(),
      child: MyApp(),
    ),
  );
}

// Using Provider in Widget
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<CounterModel>(
      builder: (context, counter, child) {
        return Column(
          children: [
            Text('Count: ${counter.counter}'),
            ElevatedButton(
              onPressed: counter.increment,
              child: Text('Increment'),
            ),
          ],
        );
      },
    );
  }
}

// Alternative usage
class AnotherWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final counter = Provider.of<CounterModel>(context);
    
    return Text('Count: ${counter.counter}');
  }
}
```

### Bloc Pattern
```dart
// pubspec.yaml
dependencies:
  flutter_bloc: ^8.0.0

// counter_event.dart
abstract class CounterEvent {}

class Increment extends CounterEvent {}
class Decrement extends CounterEvent {}

// counter_state.dart
class CounterState {
  final int counter;
  
  CounterState(this.counter);
}

// counter_bloc.dart
import 'package:flutter_bloc/flutter_bloc.dart';

class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterState(0)) {
    on<Increment>((event, emit) {
      emit(CounterState(state.counter + 1));
    });
    
    on<Decrement>((event, emit) {
      emit(CounterState(state.counter - 1));
    });
  }
}

// Using Bloc
class CounterPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => CounterBloc(),
      child: CounterView(),
    );
  }
}

class CounterView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BlocBuilder<CounterBloc, CounterState>(
        builder: (context, state) {
          return Center(
            child: Text('${state.counter}'),
          );
        },
      ),
      floatingActionButton: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          FloatingActionButton(
            onPressed: () => context.read<CounterBloc>().add(Increment()),
            child: Icon(Icons.add),
          ),
          SizedBox(height: 8),
          FloatingActionButton(
            onPressed: () => context.read<CounterBloc>().add(Decrement()),
            child: Icon(Icons.remove),
          ),
        ],
      ),
    );
  }
}
```

## Navigation

### Basic Navigation
```dart
// Navigate to new screen
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => SecondScreen()),
);

// Navigate back
Navigator.pop(context);

// Navigate and replace current screen
Navigator.pushReplacement(
  context,
  MaterialPageRoute(builder: (context) => NewScreen()),
);

// Navigate and clear all previous screens
Navigator.pushAndRemoveUntil(
  context,
  MaterialPageRoute(builder: (context) => HomeScreen()),
  (Route<dynamic> route) => false,
);
```

### Named Routes
```dart
// main.dart
MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (context) => HomeScreen(),
    '/second': (context) => SecondScreen(),
    '/third': (context) => ThirdScreen(),
  },
)

// Navigate using named routes
Navigator.pushNamed(context, '/second');
Navigator.pushReplacementNamed(context, '/third');

// Passing arguments
Navigator.pushNamed(
  context,
  '/second',
  arguments: {'id': 123, 'name': 'John'},
);

// Receiving arguments
class SecondScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    
    return Scaffold(
      body: Text('ID: ${args['id']}, Name: ${args['name']}'),
    );
  }
}
```

### Advanced Navigation (Go Router)
```dart
// pubspec.yaml
dependencies:
  go_router: ^6.0.0

// main.dart
import 'package:go_router/go_router.dart';

final GoRouter _router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => HomeScreen(),
    ),
    GoRoute(
      path: '/details/:id',
      builder: (context, state) {
        final id = state.params['id']!;
        return DetailsScreen(id: id);
      },
    ),
    GoRoute(
      path: '/profile',
      builder: (context, state) => ProfileScreen(),
      routes: [
        GoRoute(
          path: '/settings',
          builder: (context, state) => SettingsScreen(),
        ),
      ],
    ),
  ],
);

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
    );
  }
}

// Usage
context.go('/details/123');
context.push('/profile/settings');
```

## Forms and Input

### TextFormField and Form
```dart
class UserForm extends StatefulWidget {
  @override
  _UserFormState createState() => _UserFormState();
}

class _UserFormState extends State<UserForm> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      // Form is valid, process data
      print('Name: ${_nameController.text}');
      print('Email: ${_emailController.text}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('User Form')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _nameController,
                decoration: InputDecoration(
                  labelText: 'Name',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.person),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your name';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _emailController,
                decoration: InputDecoration(
                  labelText: 'Email',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.email),
                ),
                keyboardType: TextInputType.emailAddress,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your email';
                  }
                  if (!value.contains('@')) {
                    return 'Please enter a valid email';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _passwordController,
                decoration: InputDecoration(
                  labelText: 'Password',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.lock),
                ),
                obscureText: true,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a password';
                  }
                  if (value.length < 6) {
                    return 'Password must be at least 6 characters';
                  }
                  return null;
                },
              ),
              SizedBox(height: 24),
              ElevatedButton(
                onPressed: _submitForm,
                child: Text('Submit'),
                style: ElevatedButton.styleFrom(
                  minimumSize: Size(double.infinity, 50),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### Other Input Widgets
```dart
// Checkbox
bool isChecked = false;
Checkbox(
  value: isChecked,
  onChanged: (value) {
    setState(() {
      isChecked = value!;
    });
  },
)

// Radio Button
int selectedValue = 1;
Column(
  children: [
    RadioListTile<int>(
      title: Text('Option 1'),
      value: 1,
      groupValue: selectedValue,
      onChanged: (value) {
        setState(() {
          selectedValue = value!;
        });
      },
    ),
    RadioListTile<int>(
      title: Text('Option 2'),
      value: 2,
      groupValue: selectedValue,
      onChanged: (value) {
        setState(() {
          selectedValue = value!;
        });
      },
    ),
  ],
)

// Switch
bool isSwitched = false;
Switch(
  value: isSwitched,
  onChanged: (value) {
    setState(() {
      isSwitched = value;
    });
  },
)

// Slider
double sliderValue = 50.0;
Slider(
  value: sliderValue,
  min: 0.0,
  max: 100.0,
  divisions: 10,
  label: sliderValue.round().toString(),
  onChanged: (value) {
    setState(() {
      sliderValue = value;
    });
  },
)

// DropdownButton
String dropdownValue = 'Option 1';
DropdownButton<String>(
  value: dropdownValue,
  items: ['Option 1', 'Option 2', 'Option 3']
      .map<DropdownMenuItem<String>>((String value) {
    return DropdownMenuItem<String>(
      value: value,
      child: Text(value),
    );
  }).toList(),
  onChanged: (String? newValue) {
    setState(() {
      dropdownValue = newValue!;
    });
  },
)
```

## HTTP Requests

### Using http package
```dart
// pubspec.yaml
dependencies:
  http: ^0.13.5

// api_service.dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'https://jsonplaceholder.typicode.com';

  // GET request
  static Future<List<dynamic>> fetchPosts() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/posts'),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed to load posts');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  // POST request
  static Future<Map<String, dynamic>> createPost({
    required String title,
    required String body,
    required int userId,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/posts'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'title': title,
          'body': body,
          'userId': userId,
        }),
      );

      if (response.statusCode == 201) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed to create post');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  // PUT request
  static Future<Map<String, dynamic>> updatePost({
    required int id,
    required String title,
    required String body,
    required int userId,
  }) async {
    final response = await http.put(
      Uri.parse('$baseUrl/posts/$id'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'id': id,
        'title': title,
        'body': body,
        'userId': userId,
      }),
    );

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to update post');
    }
  }

  // DELETE request
  static Future<void> deletePost(int id) async {
    final response = await http.delete(
      Uri.parse('$baseUrl/posts/$id'),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to delete post');
    }
  }
}
```

### Using API in Widget
```dart
class PostsScreen extends StatefulWidget {
  @override
  _PostsScreenState createState() => _PostsScreenState();
}

class _PostsScreenState extends State<PostsScreen> {
  List<dynamic> posts = [];
  bool isLoading = true;
  String? error;

  @override
  void initState() {
    super.initState();
    _loadPosts();
  }

  Future<void> _loadPosts() async {
    try {
      setState(() {
        isLoading = true;
        error = null;
      });

      final fetchedPosts = await ApiService.fetchPosts();
      
      setState(() {
        posts = fetchedPosts;
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        error = e.toString();
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Posts')),
      body: _buildBody(),
      floatingActionButton: FloatingActionButton(
        onPressed: _loadPosts,
        child: Icon(Icons.refresh),
      ),
    );
  }

  Widget _buildBody() {
    if (isLoading) {
      return Center(child: CircularProgressIndicator());
    }

    if (error != null) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Error: $error'),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _loadPosts,
              child: Text('Retry'),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      itemCount: posts.length,
      itemBuilder: (context, index) {
        final post = posts[index];
        return Card(
          margin: EdgeInsets.all(8),
          child: ListTile(
            title: Text(
              post['title'],
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            subtitle: Text(post['body']),
            leading: CircleAvatar(
              child: Text(post['id'].toString()),
            ),
          ),
        );
      },
    );
  }
}
```

## Local Storage

### SharedPreferences
```dart
// pubspec.yaml
dependencies:
  shared_preferences: ^2.0.15

// preferences_service.dart
import 'package:shared_preferences/shared_preferences.dart';

class PreferencesService {
  static SharedPreferences? _prefs;

  static Future<void> init() async {
    _prefs = await SharedPreferences.getInstance();
  }

  // String methods
  static Future<void> setString(String key, String value) async {
    await _prefs?.setString(key, value);
  }

  static String? getString(String key) {
    return _prefs?.getString(key);
  }

  // Int methods
  static Future<void> setInt(String key, int value) async {
    await _prefs?.setInt(key, value);
  }

  static int? getInt(String key) {
    return _prefs?.getInt(key);
  }

  // Bool methods
  static Future<void> setBool(String key, bool value) async {
    await _prefs?.setBool(key, value);
  }

  static bool? getBool(String key) {
    return _prefs?.getBool(key);
  }

  // List<String> methods
  static Future<void> setStringList(String key, List<String> value) async {
    await _prefs?.setStringList(key, value);
  }

  static List<String>? getStringList(String key) {
    return _prefs?.getStringList(key);
  }

  // Remove key
  static Future<void> remove(String key) async {
    await _prefs?.remove(key);
  }

  // Clear all
  static Future<void> clear() async {
    await _prefs?.clear();
  }
}

// Usage
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await PreferencesService.init();
  runApp(MyApp());
}

// In your widget
class SettingsScreen extends StatefulWidget {
  @override
  _SettingsScreenState createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool darkMode = false;
  String username = '';

  @override
  void initState() {
    super.initState();
    _loadSettings();
  }

  void _loadSettings() {
    setState(() {
      darkMode = PreferencesService.getBool('dark_mode') ?? false;
      username = PreferencesService.getString('username') ?? '';
    });
  }

  void _saveDarkMode(bool value) {
    setState(() {
      darkMode = value;
    });
    PreferencesService.setBool('dark_mode', value);
  }

  void _saveUsername(String value) {
    setState(() {
      username = value;
    });
    PreferencesService.setString('username', value);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Settings')),
      body: Column(
        children: [
          SwitchListTile(
            title: Text('Dark Mode'),
            value: darkMode,
            onChanged: _saveDarkMode,
          ),
          Padding(
            padding: EdgeInsets.all(16),
            child: TextFormField(
              initialValue: username,
              decoration: InputDecoration(labelText: 'Username'),
              onChanged: _saveUsername,
            ),
          ),
        ],
      ),
    );
  }
}
```

## Animations

### Basic Animations
```dart
class AnimatedContainerExample extends StatefulWidget {
  @override
  _AnimatedContainerExampleState createState() => _AnimatedContainerExampleState();
}

class _AnimatedContainerExampleState extends State<AnimatedContainerExample> {
  bool _isExpanded = false;
  Color _color = Colors.blue;
  double _width = 100;
  double _height = 100;

  void _toggleAnimation() {
    setState(() {
      _isExpanded = !_isExpanded;
      _color = _isExpanded ? Colors.red : Colors.blue;
      _width = _isExpanded ? 200 : 100;
      _height = _isExpanded ? 200 : 100;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: AnimatedContainer(
          duration: Duration(seconds: 1),
          curve: Curves.easeInOut,
          width: _width,
          height: _height,
          color: _color,
          child: Center(
            child: Text(
              'Tap me!',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _toggleAnimation,
        child: Icon(Icons.play_arrow),
      ),
    );
  }
}

// Fade Transition
class FadeTransitionExample extends StatefulWidget {
  @override
  _FadeTransitionExampleState createState() => _FadeTransitionExampleState();
}

class _FadeTransitionExampleState extends State<FadeTransitionExample>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    );
    _animation = Tween<double>(begin: 0.0, end: 1.0).animate(_controller);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: FadeTransition(
          opacity: _animation,
          child: Container(
            width: 200,
            height: 200,
            color: Colors.blue,
            child: Center(
              child: Text(
                'Fade Me!',
                style: TextStyle(color: Colors.white, fontSize: 20),
              ),
            ),
          ),
        ),
      ),
      floatingActionButton: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          FloatingActionButton(
            onPressed: () => _controller.forward(),
            child: Icon(Icons.play_arrow),
            heroTag: "play",
          ),
          SizedBox(width: 10),
          FloatingActionButton(
            onPressed: () => _controller.reverse(),
            child: Icon(Icons.stop),
            heroTag: "stop",
          ),
        ],
      ),
    );
  }
}
```

### Hero Animation
```dart
// First Screen
class HeroFirstScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Hero Animation')),
      body: Center(
        child: GestureDetector(
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => HeroSecondScreen()),
            );
          },
          child: Hero(
            tag: 'hero-image',
            child: Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                color: Colors.blue,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(Icons.star, color: Colors.white, size: 50),
            ),
          ),
        ),
      ),
    );
  }
}

// Second Screen
class HeroSecondScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Hero Detail')),
      body: Center(
        child: Hero(
          tag: 'hero-image',
          child: Container(
            width: 300,
            height: 300,
            decoration: BoxDecoration(
              color: Colors.blue,
              borderRadius: BorderRadius.circular(16),
            ),
            child: Icon(Icons.star, color: Colors.white, size: 150),
          ),
        ),
      ),
    );
  }
}
```

## Testing

### Unit Tests
```dart
// test/counter_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:myapp/models/counter_model.dart';

void main() {
  group('CounterModel', () {
    test('should start with count 0', () {
      final counter = CounterModel();
      expect(counter.counter, 0);
    });

    test('should increment count', () {
      final counter = CounterModel();
      counter.increment();
      expect(counter.counter, 1);
    });

    test('should decrement count', () {
      final counter = CounterModel();
      counter.increment();
      counter.decrement();
      expect(counter.counter, 0);
    });

    test('should reset count to 0', () {
      final counter = CounterModel();
      counter.increment();
      counter.increment();
      counter.reset();
      expect(counter.counter, 0);
    });
  });
}
```

### Widget Tests
```dart
// test/widget_test.dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:myapp/main.dart';

void main() {
  group('MyApp Widget Tests', () {
    testWidgets('Counter increments smoke test', (WidgetTester tester) async {
      // Build our app and trigger a frame.
      await tester.pumpWidget(MyApp());

      // Verify that our counter starts at 0.
      expect(find.text('0'), findsOneWidget);
      expect(find.text('1'), findsNothing);

      // Tap the '+' icon and trigger a frame.
      await tester.tap(find.byIcon(Icons.add));
      await tester.pump();

      // Verify that our counter has incremented.
      expect(find.text('0'), findsNothing);
      expect(find.text('1'), findsOneWidget);
    });

    testWidgets('Should display app title', (WidgetTester tester) async {
      await tester.pumpWidget(MyApp());

      expect(find.text('Flutter Demo Home Page'), findsOneWidget);
    });

    testWidgets('Should have increment and decrement buttons', (WidgetTester tester) async {
      await tester.pumpWidget(MyApp());

      expect(find.byIcon(Icons.add), findsOneWidget);
      expect(find.byIcon(Icons.remove), findsOneWidget);
    });
  });
}
```

### Integration Tests
```dart
// integration_test/app_test.dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:myapp/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('end-to-end test', () {
    testWidgets('tap on the floating action button, verify counter', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Verify the counter starts at 0
      expect(find.text('0'), findsOneWidget);

      // Finds the floating action button to tap on
      final Finder fab = find.byTooltip('Increment');

      // Emulate a tap on the floating action button
      await tester.tap(fab);

      // Trigger a frame
      await tester.pumpAndSettle();

      // Verify the counter increments by 1
      expect(find.text('1'), findsOneWidget);
    });
  });
}
```

## Platform-Specific Code

### Method Channels
```dart
// lib/platform_service.dart
import 'package:flutter/services.dart';

class PlatformService {
  static const MethodChannel _channel = MethodChannel('com.example.myapp/platform');

  static Future<String> getPlatformVersion() async {
    try {
      final String version = await _channel.invokeMethod('getPlatformVersion');
      return version;
    } on PlatformException catch (e) {
      return "Failed to get platform version: '${e.message}'.";
    }
  }

  static Future<void> showNativeAlert(String message) async {
    try {
      await _channel.invokeMethod('showAlert', {'message': message});
    } on PlatformException catch (e) {
      print("Failed to show alert: '${e.message}'.");
    }
  }
}

// Usage in widget
class PlatformExample extends StatefulWidget {
  @override
  _PlatformExampleState createState() => _PlatformExampleState();
}

class _PlatformExampleState extends State<PlatformExample> {
  String _platformVersion = 'Unknown';

  @override
  void initState() {
    super.initState();
    _getPlatformVersion();
  }

  Future<void> _getPlatformVersion() async {
    String platformVersion = await PlatformService.getPlatformVersion();
    setState(() {
      _platformVersion = platformVersion;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Platform Service')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Running on: $_platformVersion'),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                PlatformService.showNativeAlert('Hello from Flutter!');
              },
              child: Text('Show Native Alert'),
            ),
          ],
        ),
      ),
    );
  }
}
```

### Android Implementation
```kotlin
// android/app/src/main/kotlin/com/example/myapp/MainActivity.kt
package com.example.myapp

import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import android.content.Context
import android.os.Build
import androidx.appcompat.app.AlertDialog

class MainActivity: FlutterActivity() {
    private val CHANNEL = "com.example.myapp/platform"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            when (call.method) {
                "getPlatformVersion" -> {
                    val version = "Android ${Build.VERSION.RELEASE}"
                    result.success(version)
                }
                "showAlert" -> {
                    val message = call.argument<String>("message")
                    showAlert(message ?: "Default message")
                    result.success(null)
                }
                else -> {
                    result.notImplemented()
                }
            }
        }
    }

    private fun showAlert(message: String) {
        AlertDialog.Builder(this)
            .setTitle("Native Alert")
            .setMessage(message)
            .setPositiveButton("OK") { dialog, _ -> dialog.dismiss() }
            .show()
    }
}
```

### iOS Implementation
```swift
// ios/Runner/AppDelegate.swift
import UIKit
import Flutter

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    
    let controller : FlutterViewController = window?.rootViewController as! FlutterViewController
    let platformChannel = FlutterMethodChannel(name: "com.example.myapp/platform",
                                              binaryMessenger: controller.binaryMessenger)
    
    platformChannel.setMethodCallHandler({
      (call: FlutterMethodCall, result: @escaping FlutterResult) -> Void in
      
      switch call.method {
      case "getPlatformVersion":
        result("iOS " + UIDevice.current.systemVersion)
      case "showAlert":
        if let args = call.arguments as? Dictionary<String, Any>,
           let message = args["message"] as? String {
          self.showAlert(message: message)
        }
        result(nil)
      default:
        result(FlutterMethodNotImplemented)
      }
    })
    
    GeneratedPluginRegistrant.register(with: self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
  
  private func showAlert(message: String) {
    let alert = UIAlertController(title: "Native Alert", message: message, preferredStyle: .alert)
    alert.addAction(UIAlertAction(title: "OK", style: .default))
    
    if let controller = window?.rootViewController {
      controller.present(alert, animated: true)
    }
  }
}
```

## Best Practices

### Project Structure
```
lib/
├── main.dart
├── app.dart
├── core/
│   ├── constants/
│   ├── errors/
│   ├── themes/
│   └── utils/
├── features/
│   ├── authentication/
│   │   ├── data/
│   │   ├── domain/
│   │   └── presentation/
│   └── home/
│       ├── data/
│       ├── domain/
│       └── presentation/
├── shared/
│   ├── widgets/
│   ├── services/
│   └── models/
└── config/
    ├── routes/
    └── themes/
```

### Performance Tips
1. **Use const constructors** when possible
2. **Implement proper ListView builders** for large lists
3. **Avoid rebuilding expensive widgets** with proper state management
4. **Use AutomaticKeepAliveClientMixin** for tabs
5. **Optimize images** with proper formats and sizes
6. **Use RepaintBoundary** for complex widgets
7. **Profile your app** with Flutter Inspector
8. **Minimize widget rebuilds** with keys and proper structure
9. **Use lazy loading** for data and images
10. **Implement proper error handling** and loading states

### Code Quality
1. **Follow Dart style guide** and use `dart format`
2. **Use meaningful names** for variables and functions
3. **Write comprehensive tests** (unit, widget, integration)
4. **Document public APIs** with dartdoc comments
5. **Use static analysis** with `dart analyze`
6. **Handle null safety** properly
7. **Implement proper error handling**
8. **Use dependency injection** for testability
9. **Keep widgets small and focused**
10. **Use version control** effectively
