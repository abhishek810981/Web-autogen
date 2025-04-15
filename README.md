# AutoGen Labs Website

A modern, responsive website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. This website showcases AutoGen Labs' products and services with elegant animations and a clean user interface.

## Features

- 🚀 Built with Next.js 14
- 💻 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- ✨ Framer Motion animations
- 📱 Fully responsive design
- 🎯 Modern UI/UX with gradient effects
- 🔍 SEO optimized
- 🌙 Dynamic navbar with scroll effects

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Web-autogen
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                   # Next.js app directory
├── components/           # Reusable components
│   ├── Blog/
│   ├── Features/
│   ├── Hero/
│   ├── Navbar/
│   └── ...
└── styles/              # Global styles
```

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## EC2 File Management

To delete files from an EC2 instance, you can use the following methods:

### Using SSH Command Line

1. Connect to your EC2 instance:
```bash
ssh -i "your-key.pem" ec2-user@your-ec2-ip
```

2. Navigate to the directory containing the file:
```bash
cd /path/to/directory
```

3. Delete files using the rm command:
```bash
# Delete a single file
rm filename.txt

# Delete multiple files
rm file1.txt file2.txt

# Delete a directory and its contents
rm -r directory_name

# Force delete (use with caution)
rm -f filename.txt

# Delete all files in current directory (use with caution)
rm -rf *
```

### Using AWS CLI

You can also use AWS CLI to manage files:

```bash
# Sync local directory with S3
aws s3 sync . s3://your-bucket

# Delete files from S3
aws s3 rm s3://your-bucket/filename.txt
```

⚠️ **Important Notes:**
- Always double-check before using rm -rf commands
- Make sure you have proper backups before deleting files
- Ensure you have the correct permissions
- Consider using --preserve-root flag for additional safety

## License

[MIT License](LICENSE)

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request