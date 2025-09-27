export const verificationEmailTemplate = (
  userName,
  verificationLink,
  appUrl = "http://localhost:5173",
  expirationHours = 24
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your WHISPR Account</title>
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
            background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
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
        .verify-icon { 
            width: 70px; 
            height: 70px; 
            background: rgba(255,255,255,0.15); 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 30px; 
            margin: 0 auto 20px; 
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
            text-align: center;
        }
        .message { 
            font-size: 16px; 
            color: #475569; 
            margin-bottom: 30px; 
            line-height: 1.6; 
            text-align: center;
        }
        .verification-box { 
            background: linear-gradient(145deg, #f0fdf4 0%, #dcfce7 100%); 
            border-radius: 12px; 
            padding: 40px 30px; 
            margin: 30px 0; 
            text-align: center; 
            border: 1px solid #bbf7d0;
        }
        .verification-box h3 { 
            color: #166534; 
            font-size: 20px; 
            margin-bottom: 15px; 
            font-weight: 600; 
        }
        .verification-box p { 
            color: #15803d; 
            margin-bottom: 25px; 
            font-size: 15px;
        }
        .verify-button { 
            display: inline-block; 
            background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
            color: white; 
            padding: 16px 32px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: 600; 
            font-size: 16px; 
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
        }
        .verify-button:hover { 
            transform: translateY(-1px); 
            box-shadow: 0 4px 8px rgba(16, 185, 129, 0.4); 
        }
        .info-box { 
            background: #fef3c7; 
            border-left: 4px solid #f59e0b; 
            padding: 20px; 
            margin: 25px 0; 
            border-radius: 0 8px 8px 0;
        }
        .info-box .info-title { 
            font-weight: 600; 
            color: #92400e; 
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .info-box .info-text { 
            color: #a16207; 
            font-size: 14px; 
        }
        .timer-notice { 
            background: #fef2f2; 
            border: 1px solid #fecaca; 
            border-radius: 8px; 
            padding: 20px; 
            margin: 25px 0; 
            text-align: center;
        }
        .timer-notice .timer-text { 
            color: #dc2626; 
            font-weight: 600; 
            font-size: 16px; 
            margin-bottom: 5px;
        }
        .timer-notice .timer-sub { 
            color: #b91c1c; 
            font-size: 14px; 
        }
        .alternative { 
            margin-top: 40px; 
            padding-top: 30px; 
            border-top: 1px dashed #cbd5e1;
        }
        .alternative-text { 
            color: #64748b; 
            font-size: 14px; 
            text-align: center; 
            margin-bottom: 15px; 
        }
        .link-box { 
            background: #f1f5f9; 
            border: 1px dashed #cbd5e1; 
            border-radius: 8px; 
            padding: 15px; 
            word-break: break-all; 
            font-size: 12px; 
            color: #475569; 
            text-align: center; 
            font-family: 'SF Mono', Monaco, monospace;
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
            color: #10b981; 
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
            .verify-button { 
                font-size: 15px; 
                padding: 14px 28px; 
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">W</div>
            <div class="verify-icon">🔒</div>
            <h1 class="title">Verify Your Email</h1>
            <p class="subtitle">One quick step to get started</p>
        </div>
        
        <div class="content">
            <h2 class="greeting">Hi ${userName}! 👋</h2>
            
            <p class="message">
                Thanks for signing up for WHISPR! To complete your account setup and start chatting, 
                please verify your email address.
            </p>
            
            <div class="verification-box">
                <div style="font-size: 48px; margin-bottom: 20px;">📧</div>
                <h3>Verify Your Email Address</h3>
                <p>Click the button below to confirm your email and activate your account</p>
                <a href="${verificationLink}" class="verify-button">Verify Email</a>
            </div>
            
            <div class="timer-notice">
                <div class="timer-text">⏰ Link expires in ${expirationHours} hours</div>
                <div class="timer-sub">Please verify your account soon</div>
            </div>
            
            <div class="info-box">
                <div class="info-title">
                    <span>🛡️</span>
                    Why verify?
                </div>
                <div class="info-text">
                    Email verification helps keep your WHISPR account secure and ensures you can recover 
                    your account if needed.
                </div>
            </div>
            
            <div class="alternative">
                <p class="alternative-text">
                    Having trouble with the button? Copy and paste this link in your browser:
                </p>
                <div class="link-box">${verificationLink}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>
                © ${new Date().getFullYear()} WHISPR - A personal MERN stack project<br>
                Need help? This is a personal project, but feel free to <a href="${appUrl}">visit the app</a>
            </p>
        </div>
    </div>
</body>
</html>`;
};
