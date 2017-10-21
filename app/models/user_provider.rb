class UserProvider < ActiveRecord::Base
  belongs_to :user

  def self.find_for_oauth(auth)
    user = UserProvider.where(provider: auth.provider, uid: auth.uid).first

    if user.nil?
      new_user = create_new_user(auth)
      create_user_provider(auth, new_user)


      registered_user = User.where(email: auth.info.email).first

      if registered_user.nil?
        create_new_user(auth)
      else
        create_user_provider(auth, registered_user)
        registered_user
      end
    else
      user.user
    end
  end

  def self.create_new_user(auth)
    User.create!(username: auth.extra.raw_info.name,
             email: auth.info.email,
             password: Devise.friendly_token[0, 20])
  end

  def self.create_user_provider(auth, user)
    UserProvider.create!(
      provider: auth.provider,
      uid: auth.uid,
      user_id: user.id
    )
  end
end
