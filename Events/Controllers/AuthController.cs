using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Events.Interfaces;
using Events.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Events.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase // Controller qui gère la connexion et l'attribution d'un token
    {
        private readonly ICredentialsRepository _credentialsRepository;

        public AuthController(ICredentialsRepository credentialsRepository)
        {
            _credentialsRepository = credentialsRepository;            
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody]Credentials user)
        {

            if (user == null)
            {
                return BadRequest("Invalid client request");
            }


            IEnumerable<Credentials> credentialsList = await _credentialsRepository.GetAllCredentials();

            var findCredential = credentialsList.FirstOrDefault(credential => credential.Username == user.Username);         

            if(!string.IsNullOrEmpty(findCredential.Username))
            {
                var saltToByte = Convert.FromBase64String(findCredential.Salt);

               string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
               password: user.Password,
               salt: saltToByte,
               prf: KeyDerivationPrf.HMACSHA1,
               iterationCount: 10000,
               numBytesRequested: 256 / 8));

                if (findCredential.Password == hashedPassword)
                {
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecrEtKeyEventMicr0p0le"));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                    var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Username)
                };
                    var tokeOptions = new JwtSecurityToken(
                        issuer: "https://localhost:44320",
                        audience: "https://localhost:44320",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(5),
                        signingCredentials: signinCredentials
                        );

                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                    return Ok(new { Token = tokenString });
                }
                else
                {
                    return Unauthorized();
                }
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}