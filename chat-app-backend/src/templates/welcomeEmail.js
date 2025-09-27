export const welcomeEmailTemplate = (userName, userEmail, appUrl = "http://localhost:5173"
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to WHISPR</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; 
            line-height: 1.6; 
            background-color: #f8fafc; 
            padding: 20px; 
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #ffffff; 
            border-radius: 16px; 
            overflow: hidden; 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); 
            border: 1px solid #e2e8f0;
        }
        .header { 
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); 
            padding: 40px 30px; 
            text-align: center; 
            color: white;
        }
        .logo { 
            width: 60px; 
            height: 60px; 
            background: rgba(255,255,255,0.2); 
            border-radius: 12px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 24px; 
            font-weight: 700; 
            margin: 0 auto 20px; 
            border: 1px solid rgba(255,255,255,0.3);
        }
        .title { 
            font-size: 28px; 
            font-weight: 700; 
            margin-bottom: 8px; 
        }
        .subtitle { 
            font-size: 16px; 
            opacity: 0.9; 
        }
        .content { 
            padding: 40px 30px; 
        }
        .greeting { 
            font-size: 24px; 
            color: #1e293b; 
            margin-bottom: 20px; 
            font-weight: 600; 
        }
        .message { 
            font-size: 16px; 
            color: #475569; 
            margin-bottom: 30px; 
            line-height: 1.6; 
        }
        .features { 
            background: #f8fafc; 
            border-radius: 12px; 
            padding: 30px 25px; 
            margin: 30px 0; 
            border: 1px solid #e2e8f0;
        }
        .features h3 { 
            color: #1e293b; 
            font-size: 20px; 
            margin-bottom: 20px; 
            font-weight: 600; 
        }
        .feature-list { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 20px; 
        }
        .feature { 
            display: flex; 
            align-items: flex-start; 
            gap: 12px; 
        }
        .feature-icon { 
            font-size: 20px; 
            margin-top: 2px; 
        }
        .feature-content h4 { 
            font-size: 16px; 
            font-weight: 600; 
            color: #1e293b; 
            margin-bottom: 4px; 
        }
        .feature-content p { 
            font-size: 14px; 
            color: #64748b; 
        }
        .cta-section { 
            text-align: center; 
            margin: 40px 0; 
        }
        .cta-button { 
            display: inline-block; 
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); 
            color: white; 
            padding: 14px 28px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: 600; 
            font-size: 16px; 
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);
        }
        .cta-button:hover { 
            transform: translateY(-1px); 
            box-shadow: 0 4px 8px rgba(99, 102, 241, 0.4); 
        }
        .divider { 
            height: 1px; 
            background: #e2e8f0; 
            margin: 30px 0; 
        }
        .footer { 
            background: #f8fafc; 
            padding: 30px; 
            text-align: center; 
            color: #64748b; 
            font-size: 14px; 
            border-top: 1px solid #e2e8f0;
        }
        .footer a { 
            color: #6366f1; 
            text-decoration: none; 
        }
        @media (max-width: 600px) {
            .container { 
                margin: 10px; 
                border-radius: 12px; 
            }
            .content, .header { 
                padding: 30px 20px; 
            }
            .title { 
                font-size: 24px; 
            }
            .feature-list { 
                grid-template-columns: 1fr; 
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">W</div>
            <h1 class="title">Welcome to WHISPR</h1>
            <p class="subtitle">Real-time chat made simple</p>
        </div>
        
        <div class="content">
            <h2 class="greeting">Hi ${userName}! 👋</h2>
            
            <p class="message">
                Thanks for joining WHISPR! Your account has been created successfully with <strong>${userEmail}</strong>. 
                You're now ready to start chatting in real-time.
            </p>
            
            <div class="features">
                <h3>What you can do:</h3>
                <div class="feature-list">
                    <div class="feature">
                        <span class="feature-icon">⚡</span>
                        <div class="feature-content">
                            <h4>Real-time Messaging</h4>
                            <p>Send and receive messages instantly</p>
                        </div>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">👥</span>
                        <div class="feature-content">
                            <h4>Group Chats</h4>
                            <p>Create rooms and chat with multiple people</p>
                        </div>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">📱</span>
                        <div class="feature-content">
                            <h4>Mobile Friendly</h4>
                            <p>Works great on all devices</p>
                        </div>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">🔒</span>
                        <div class="feature-content">
                            <h4>Secure</h4>
                            <p>Your conversations are safe</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="cta-section">
                <a href="${appUrl}" class="cta-button">Start Chatting</a>
                <p style="margin-top: 15px; color: #64748b; font-size: 14px;">
                    Ready to connect with others?
                </p>
            </div>
            
            <div class="divider"></div>
            
            <p class="message">
                WHISPR is a personal project built with the MERN stack. 
                Feel free to explore and enjoy the real-time chat experience!
            </p>
        </div>
        
        <div class="footer">
            <p>
                © ${new Date().getFullYear()} WHISPR - A personal MERN stack project<br>
                <a href="${appUrl}">Visit WHISPR</a>
            </p>
        </div>
    </div>
</body>
</html>`;
}
